const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const UUID = process.env.UUID || 'b83296c0-6815-46fd-8260-ebdf95772b7e';
const PATH = process.env.PATH || '/vless-ws';

const server = http.createServer((req, res) => {
  if (req.url === PATH) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('VLESS WebSocket Server is Running Successfully!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
