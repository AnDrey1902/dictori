/** Probe: whisper-large-turbo GGUF on transcribe.cpp with run_params language hint. */
const { app } = require('electron');
const path = require('path');
const fs = require('fs');
const { Worker } = require('worker_threads');

function decodeWav16k(buffer) {
  let pos = 12, fmt = null, data = null;
  while (pos < buffer.length - 8) {
    const id = buffer.toString('ascii', pos, pos + 4);
    const sz = buffer.readUInt32LE(pos + 4);
    if (id === 'fmt ') fmt = { ch: buffer.readUInt16LE(pos + 10), rate: buffer.readUInt32LE(pos + 12) };
    else if (id === 'data') { data = buffer.subarray(pos + 8, pos + 8 + sz); break; }
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
  const out = new Float32Array(Math.floor(samples.length * ratio));
  for (let i = 0; i < out.length; i++) {
    const src = i / ratio, i0 = Math.floor(src), i1 = Math.min(i0 + 1, samples.length - 1), f = src - i0;
    out[i] = samples[i0] * (1 - f) + samples[i1] * f;
  }
  return out;
}

(async () => {
  await app.whenReady();
  const lines = [];
  const flush = () => fs.writeFileSync(path.join(__dirname, 'probe-large.log'), lines.join('\n'));
  const log = (s) => { lines.push(s); console.log(s); };

  const dllDir = path.resolve(__dirname, '..', 'resources', 'transcribe', 'win-x64');
  const workerPath = path.resolve(__dirname, '..', 'dist-electron', 'services', 'transcribeWorker.js');
  const model = path.join(process.env.APPDATA, 'speaky', 'models', 'transcribe.cpp', 'whisper-large-v3-turbo-q4', 'whisper-large-v3-turbo-Q4_K_M.gguf');
  const wav = path.join(process.env.TEMP, 'speaky-16k-native.wav');
  if (!fs.existsSync(model)) { log('model missing'); flush(); process.exit(1); }

  const w = new Worker(workerPath, { workerData: { dllDir } });
  const t0 = Date.now();
  const timer = setTimeout(() => { log('TIMEOUT'); flush(); process.exit(1); }, 180000);
  w.on('message', (m) => {
    if (m.type === 'hello') w.postMessage({ type: 'open', modelPath: model, language: 'ru' });
    else if (m.type === 'ready') {
      log('opened in ' + (Date.now() - t0) + 'ms');
      w.postMessage({ type: 'run', samples: decodeWav16k(fs.readFileSync(wav)), seq: 1 });
    } else if (m.type === 'result') {
      clearTimeout(timer);
      log('RESULT (' + (Date.now() - t0) + 'ms): ' + JSON.stringify(m.text));
      flush(); setTimeout(() => process.exit(0), 300);
    } else if (m.type === 'error') {
      clearTimeout(timer); log('ERROR: ' + m.message); flush(); setTimeout(() => process.exit(1), 300);
    }
  });
  w.on('error', (e) => { log('worker error: ' + e.message); flush(); process.exit(1); });
})();
