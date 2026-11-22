// Local dev server that works even when the project path contains "#"
// (Vite's dev server behind `ng serve` breaks on such paths).
// It runs `ng build --watch` and serves the output with an SPA fallback.
// Refresh the browser after saving a file to see changes.
import { spawn } from 'node:child_process';
import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outDir = join(root, 'dist', 'portfolio', 'browser');
const port = Number(process.env.PORT) || 4200;

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.map': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const ng = spawn('npx', ['ng', 'build', '--watch', '--configuration', 'development'], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
});
ng.on('exit', (code) => process.exit(code ?? 0));

createServer((req, res) => {
  const urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  let file = normalize(join(outDir, urlPath));
  if (!file.startsWith(outDir) || !existsSync(file) || statSync(file).isDirectory()) {
    file = join(outDir, 'index.html');
  }
  if (!existsSync(file)) {
    res.writeHead(503, { 'Content-Type': 'text/plain' });
    res.end('Still building… refresh in a few seconds.');
    return;
  }
  res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}).listen(port, () => {
  console.log(`\n  Portfolio dev server → http://localhost:${port}/  (refresh after saving)\n`);
});

process.on('SIGINT', () => {
  ng.kill();
  process.exit(0);
});
