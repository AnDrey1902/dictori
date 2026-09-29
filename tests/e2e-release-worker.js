/**
 * E2E: run the PACKAGED (asar.unpacked) transcribeWorker.js exactly like the
 * installed release does — real dll, real GigaAM model, real Russian audio.
 * Also verifies whisper-server language handling ('ru' forced, 'auto').
 * Run: npx electron tests/e2e-release-worker.js <outlog>
 */
const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');
const { spawn } = require('child_process');
const http = require('http');

const outLog = process.argv[2] || path.join(__dirname, 'e2e-release.log');
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };
const flush = () => { try { fs.writeFileSync(outLog, lines.join('\n')); } catch {} };
process.on('exit', flush);

const RES = path.resolve(__dirname, '..', 'resources');
const APP_ASAR_RES = path.resolve(RES, '..', 'release', 'win-unpacked', 'resources');
// Simulate packaged layout: point the "asar" path at the unpacked copy
const UNPACKED = path.join(APP_ASAR_RES, 'app.asar.unpacked');

async function main() {
  await app.whenReady();

  const dllDir = path.join(RES, 'transcribe', 'win-x64');
  const model = path.join(process.env.APPDATA, 'speaky', 'models', 'transcribe.cpp',
    'gigaam-v3-q5', 'gigaam-v3-e2e-rnnt-Q5_K_M.gguf');
  const wav = path.join(process.env.TEMP, 'speaky-ru.wav');

  if (!fs.existsSync(model)) { log('FAIL: model missing: ' + model); return; }
  if (!fs.existsSync(wav)) { log('FAIL: wav missing: ' + wav); return; }

  // ── 1. Packaged worker path: asar → asar.unpacked remap ──
  const asarWorkerPath = path.join(APP_ASAR_RES, 'app.asar', 'dist-electron', 'services', 'transcribeWorker.js');
  const workerPath = asarWorkerPath.includes('app.asar.unpacked')
    ? asarWorkerPath
    : asarWorkerPath.replace('app.asar', 'app.asar.unpacked');
  log('[e2e] worker path: ' + workerPath);
  if (!fs.existsSync(workerPath)) { log('FAIL: unpacked worker missing'); return; }

  const result = await new Promise((resolve) => {
    const w = new Worker(workerPath, { workerData: { dllDir } });
    let opened = false;
    const timer = setTimeout(() => resolve({ fail: 'timeout 120s' }), 120000);
    w.on('message', (msg) => {
      if (msg.type === 'hello' || msg.type === 'ready') {
        if (msg.type === 'ready' && !opened) {
          opened = true;
          log('[e2e] opened, backend: ' + msg.backend);
          // 16k mono PCM from the wav (recorder produces 16k; this TTS wav is 22k → resample crude)
          const buf = fs.readFileSync(wav);
          // crude: assume PCM16 wav; decode + resample like localWhisper does
          const pcm = decodeWav16k(buf);
          w.postMessage({ type: 'run', samples: pcm, seq: 1 });
        } else if (msg.type === 'hello') {
          w.postMessage({ type: 'open', modelPath: model, language: 'ru' });
        }
      } else if (msg.type === 'result') {
        clearTimeout(timer);
        log('[e2e] RESULT: ' + JSON.stringify(msg.text));
        log('[e2e] lang: ' + msg.detectedLanguage + ' backend: ' + msg.backend);
        resolve({ ok: true, text: msg.text });
        w.postMessage({ type: 'close' });
      } else if (msg.type === 'error') {
        clearTimeout(timer);
        log('[e2e] ERROR: ' + msg.message);
        resolve({ fail: msg.message });
      }
    });
    w.on('error', (e) => { clearTimeout(timer); log('[e2e] worker error: ' + e.message); resolve({ fail: e.message }); });
    w.on('exit', (c) => { if (!lines.some(l => l.includes('RESULT'))) { clearTimeout(timer); resolve({ fail: 'worker exit ' + c }); } });
  });

  // ── 2. whisper-server language check: ru forced vs auto ──
  const serverExe = path.join(RES, 'whisper', 'win-x64', 'whisper-server.exe');
  const modelBin = path.join(process.env.APPDATA, 'speaky', 'models', 'whisper.cpp', 'whisper-small-q5', 'ggml-small-q5_1.bin');
  if (fs.existsSync(serverExe) && fs.existsSync(modelBin)) {
    log('[e2e] starting whisper-server for language check...');
    const port = 18433;
    const proc = spawn(serverExe, ['-m', modelBin, '--host', '127.0.0.1', '--port', String(port), '-t', '4'],
      { windowsHide: true, stdio: ['ignore', 'ignore', 'ignore'] });
    let ready = false;
    for (let i = 0; i < 60 && !ready; i++) {
      ready = await new Promise((r) => {
        const rq = http.get({ host: '127.0.0.1', port, path: '/', timeout: 500 }, (res) => { res.resume(); r(true); });
        rq.on('error', () => r(false));
        rq.on('timeout', () => { rq.destroy(); r(false); });
      });
      if (!ready) await new Promise((r) => setTimeout(r, 500));
    }
    if (ready) {
      for (const lang of ['ru', 'auto']) {
        try {
          const text = await postWav(port, wav, lang);
          log(`[e2e] whisper-server lang=${lang}: ${JSON.stringify(text.slice(0, 120))}`);
        } catch (e) {
          log(`[e2e] whisper-server lang=${lang} ERROR: ${e.message}`);
        }
      }
    } else {
      log('[e2e] whisper-server failed to become ready');
    }
    try { proc.kill(); } catch {}
  }

  log(lines.some(l => l.includes('RESULT')) ? '[e2e] PASS' : '[e2e] FAIL');
}

/** Decode a PCM16 wav to 16k mono Float32 (same math as localWhisper) */
function decodeWav16k(buffer) {
  let pos = 12, fmt = null, data = null;
  while (pos < buffer.length - 8) {
    const id = buffer.toString('ascii', pos, pos + 4);
    const sz = buffer.readUInt32LE(pos + 4);
    if (id === 'fmt ') {
      fmt = { ch: buffer.readUInt16LE(pos + 10), rate: buffer.readUInt32LE(pos + 12), bits: buffer.readUInt16LE(pos + 22) };
    } else if (id === 'data') { data = buffer.subarray(pos + 8, pos + 8 + sz); break; }
    pos += 8 + sz + (sz & 1);
  }
  let samples = new Float32Array(Math.floor(data.length / 2));
  for (let i = 0; i < samples.length; i++) samples[i] = data.readInt16LE(i * 2) / 32768;
  if (fmt.ch > 1) {
    const mono = new Float32Array(Math.floor(samples.length / fmt.ch));
    for (let i = 0; i < mono.length; i++) { let acc = 0; for (let c = 0; c < fmt.ch; c++) acc += samples[i * fmt.ch + c]; mono[i] = acc / fmt.ch; }
    samples = mono;
  }
  const ratio = 16000 / fmt.rate;
  const outLen = Math.floor(samples.length * ratio);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const src = i / ratio, i0 = Math.floor(src), i1 = Math.min(i0 + 1, samples.length - 1), frac = src - i0;
    out[i] = samples[i0] * (1 - frac) + samples[i1] * frac;
  }
  return out;
}

function postWav(port, wavPath, language) {
  return new Promise((resolve, reject) => {
    const boundary = '----SpeakyE2E' + Date.now();
    const chunks = [];
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`));
    chunks.push(fs.readFileSync(wavPath));
    chunks.push(Buffer.from(`\r\n--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\n${language}\r\n`));
    chunks.push(Buffer.from(`\r\n--${boundary}--\r\n`));
    const body = Buffer.concat(chunks);
    const req = http.request({
      host: '127.0.0.1', port, path: '/inference', method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length },
      timeout: 120000
    }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => {
        try { resolve(JSON.parse(data).text || ''); } catch { reject(new Error('bad json: ' + data.slice(0, 100))); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

main().then(() => { flush(); setTimeout(() => process.exit(0), 500); }).catch((e) => { log('[e2e] fatal: ' + e.message); flush(); process.exit(1); });
