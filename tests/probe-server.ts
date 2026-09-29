/**
 * POST a wav to the RUNNING whisper-server (app instance) with language=ru,
 * exactly like the app does. Usage: npx tsx tests/probe-server.ts <wav> [port]
 */
import fs from 'fs';
import http from 'http';

const [wavPath, portArg] = process.argv.slice(2);
const port = Number(portArg || 18422);

function postWav(wavPath: string, language: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const boundary = '----SpeakyProbe' + Date.now();
    const chunks: Buffer[] = [];
    chunks.push(Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`));
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
        try { resolve(JSON.parse(data).text || ''); } catch { reject(new Error('bad json: ' + data.slice(0, 200))); }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
    req.write(body);
    req.end();
  });
}

(async () => {
  for (const lang of ['ru', 'auto']) {
    try {
      const text = await postWav(wavPath, lang);
      console.log(`lang=${lang}: ${JSON.stringify(text)}`);
    } catch (e: any) {
      console.log(`lang=${lang} ERROR: ${e.message}`);
    }
  }
})();
