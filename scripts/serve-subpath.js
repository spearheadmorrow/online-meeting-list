// Zero-dependency static server that mounts the build directory at a given subpath
// Usage: node scripts/serve-subpath.js /online-meeting-list 5000

const http = require('http');
const fs = require('fs');
const path = require('path');

const subpath = process.argv[2] || '/online-meeting-list';
const port = parseInt(process.argv[3], 10) || 5000;
const buildDir = path.join(__dirname, '..', 'build');

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

    // Map request to file under buildDir
    let rel = url.slice(subpath.length);
    if (!rel || rel === '/') rel = '/index.html';
    const filePath = path.join(buildDir, rel);

    // Prevent path traversal
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
      // SPA fallback: serve index.html for missing files under subpath
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

server.listen(port, () => {
  console.log(`Serving ${buildDir} at http://localhost:${port}${subpath}`);
});
