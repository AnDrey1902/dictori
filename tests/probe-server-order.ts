/**
 * Multipart ordering probe for whisper-server: language field BEFORE vs AFTER the file.
 * Usage: npx tsx tests/probe-server-order.ts <wav> <port>
 */
import fs from 'fs';
import http from 'http';

const [wavPath, portArg] = process.argv.slice(2);
const port = Number(portArg || 18455);

function post(wavPath: string, language: string, langFirst: boolean): Promise<string> {
  return new Promise((resolve, reject) => {
    const boundary = '----SpeakyProbe' + Date.now();
    const chunks: Buffer[] = [];
    const filePart = (): Buffer[] => [
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`),
      fs.readFileSync(wavPath)
    ];
    const langPart = (): Buffer[] => [
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="language"\r\n\r\n${language}\r\n`)
    ];
    const parts = langFirst ? [...langPart(), ...filePart()] : [...filePart(), ...langPart()];
    for (const p of parts) chunks.push(...(p ? [p] : []));
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
  for (const [lang, first] of [['ru', true], ['ru', false], ['auto', true]] as const) {
    try {
      const text = await post(wavPath, lang, first);
      console.log(`lang=${lang} langFieldFirst=${first}: ${JSON.stringify(text.slice(0, 140))}`);
    } catch (e: any) {
      console.log(`lang=${lang} first=${first} ERROR: ${e.message}`);
    }
  }
})();
