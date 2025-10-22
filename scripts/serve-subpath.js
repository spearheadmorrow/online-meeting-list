// Zero-dependency static server that mounts the build directory at a given subpath
// Usage: node scripts/serve-subpath.js /online-meeting-list 5000

const http = require('http');
const fs = require('fs');
const path = require('path');

const subpath = process.argv[2] || '/online-meeting-list';
const port = parseInt(process.argv[3], 10) || 5000;

let buildDir = path.join(__dirname, '..', 'build');
const ghPagesSubdir = path.join(buildDir, 'online-meeting-list');
if (fs.existsSync(ghPagesSubdir)) {
  buildDir = ghPagesSubdir;
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.wasm': 'application/wasm'
};

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }
    res.setHeader('Content-Type', type);
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  try {
    const url = decodeURI(req.url.split('?')[0]);
    if (!url.startsWith(subpath)) {
      res.statusCode = 404;
      res.end('Not found');
      return;
    }

    let rel = url.slice(subpath.length);
    if (!rel || rel === '/') rel = '/index.html';
    const filePath = path.join(buildDir, rel);

    if (!filePath.startsWith(buildDir)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    fs.stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        sendFile(res, filePath);
        return;
      }

      const index = path.join(buildDir, 'index.html');
      fs.stat(index, (iErr, iStats) => {
        if (!iErr && iStats.isFile()) {
          sendFile(res, index);
        } else {
          res.statusCode = 404;
          res.end('Not found');
        }
      });
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error');
  }
});

const tryListen = (p, attemptsLeft) => {
  server.listen(p, () => {
    console.log(`Serving ${buildDir} at http://localhost:${p}${subpath}`);
  });

  server.on('error', err => {
    if (err && err.code === 'EADDRINUSE' && attemptsLeft > 0) {
      const next = p + 1;

      server.removeAllListeners('error');
      setTimeout(() => tryListen(next, attemptsLeft - 1), 100);
    } else {
      // eslint-disable-next-line no-console
      console.error('Server failed to start:', err);
      process.exit(1);
    }
  });
};

tryListen(port, 10);
