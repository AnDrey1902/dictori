/**
 * Final E2E against the PACKAGED bundle layout (win-unpacked):
 *  A) transcribe.cpp worker @ app.asar.unpacked + GigaAM (installed model)
 *  B) transcribe.cpp worker + Parakeet (custom model from user folder)
 *  C) whisper-server started with app args (-l auto) + app multipart order (lang first)
 * Run: npx electron tests/e2e-final.js <outlog>
 */
const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');
const { spawn } = require('child_process');
const http = require('http');

const outLog = process.argv[2] || path.join(__dirname, 'e2e-final.log');
const lines = [];
const log = (s) => { lines.push(s); console.log(s); };
const flush = () => { try { fs.writeFileSync(outLog, lines.join('\n')); } catch {} };
process.on('exit', flush);

const ROOT = path.resolve(__dirname, '..');
const RES = path.join(ROOT, 'resources');
const UNPACKED = path.join(ROOT, 'release', 'win-unpacked', 'resources', 'app.asar.unpacked');

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

/** Run the packaged worker: open model, transcribe pcm */
function runWorker(dllDir, workerPath, modelPath, pcm, label, timeoutMs = 120000) {
  return new Promise((resolve) => {
    const w = new Worker(workerPath, { workerData: { dllDir } });
    let opened = false;
    const t0 = Date.now();
    const timer = setTimeout(() => { resolve({ fail: 'timeout' }); try { w.terminate(); } catch {} }, timeoutMs);
    w.on('message', (msg) => {
      if (msg.type === 'hello' && !opened) {
        w.postMessage({ type: 'open', modelPath, language: 'ru' });
      } else if (msg.type === 'ready' && !opened) {
        opened = true;
        log(`[${label}] opened (backend: ${String(msg.backend).replace(/[^\x20-\x7e]/g, '')})`);
        w.postMessage({ type: 'run', samples: pcm, seq: 1 });
      } else if (msg.type === 'result') {
        clearTimeout(timer);
        log(`[${label}] RESULT (${Date.now() - t0}ms): ${JSON.stringify(msg.text)}`);
        resolve({ ok: true, text: msg.text });
        w.postMessage({ type: 'close' });
      } else if (msg.type === 'error') {
        clearTimeout(timer);
        log(`[${label}] ERROR: ${msg.message}`);
        resolve({ fail: msg.message });
      }
    });
    w.on('error', (e) => { clearTimeout(timer); log(`[${label}] worker error: ${e.message}`); resolve({ fail: e.message }); });
    w.on('exit', (c) => { clearTimeout(timer); resolve(lines.some(l => l.includes('RESULT') && l.includes(`[${label}]`)) ? { ok: true } : { fail: 'exit ' + c }); });
  });
}

function postWavAppOrder(port, wavPath, language) {
  return new Promise((resolve, reject) => {
    const boundary = '----SpeakyFinal' + Date.now();
    const chunks = [];
    if (language) chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\n${language}\r\n`));
    chunks.push(Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`));
    chunks.push(fs.readFileSync(wavPath));
    chunks.push(Buffer.from(`\r\n--${boundary}--\r\n`));
    const body = Buffer.concat(chunks);
    const req = http.request({
      host: '127.0.0.1', port, path: '/inference', method: 'POST',
      headers: { 'Content-Type': `multipart/form-data; boundary=${boundary}`, 'Content-Length': body.length },
      timeout: 120000
    }, (res) => {
      let data = '';
      res.on('data', (c) => { data += c; });
      res.on('end', () => { try { resolve(JSON.parse(data).text || ''); } catch { reject(new Error('bad json')); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  await app.whenReady();
  const wavNative = path.join(process.env.TEMP, 'speaky-16k-native.wav');
  const pcm = decodeWav16k(fs.readFileSync(wavNative));

  const dllDir = path.join(RES, 'transcribe', 'win-x64');
  const workerPath = path.join(UNPACKED, 'dist-electron', 'services', 'transcribeWorker.js');
  if (!fs.existsSync(workerPath)) { log('FAIL: packaged worker missing'); return; }
  log('[e2e] worker: ' + workerPath);

  const gigaam = path.join(process.env.APPDATA, 'speaky', 'models', 'transcribe.cpp', 'gigaam-v3-q5', 'gigaam-v3-e2e-rnnt-Q5_K_M.gguf');
  const parakeet = 'D:\\portable\\speaky\\models\\parakeet-tdt-0.6b-v3-Q5_K_M.gguf';

  await runWorker(dllDir, workerPath, gigaam, pcm, 'A-GigaAM');
  if (fs.existsSync(parakeet)) await runWorker(dllDir, workerPath, parakeet, pcm, 'B-Parakeet');
  else log('[B-Parakeet] SKIP: file not found');

  // C: whisper-server with app args
  const serverExe = path.join(RES, 'whisper', 'win-x64', 'whisper-server.exe');
  const modelBin = path.join(process.env.APPDATA, 'speaky', 'models', 'whisper.cpp', 'whisper-small-q5', 'ggml-small-q5_1.bin');
  const port = 18466;
  const proc = spawn(serverExe, ['-m', modelBin, '--host', '127.0.0.1', '--port', String(port), '-t', '4', '-l', 'auto'],
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
    const t0 = Date.now();
    const text = await postWavAppOrder(port, wavNative, 'ru');
    log(`[C-whisperServer] RESULT (${Date.now() - t0}ms): ${JSON.stringify(text.slice(0, 140))}`);
  } else log('[C-whisperServer] FAIL: not ready');
  try { proc.kill(); } catch {}

  const pass = lines.some(l => l.includes('[A-GigaAM] RESULT')) && lines.some(l => l.includes('[C-whisperServer] RESULT'));
  log(pass ? '[e2e] PASS' : '[e2e] FAIL');
}

main().then(() => { flush(); setTimeout(() => process.exit(0), 500); }).catch((e) => { log('[e2e] fatal: ' + e.message); flush(); process.exit(1); });
