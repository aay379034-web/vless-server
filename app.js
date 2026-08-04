const http = require('http');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const UUID = process.env.UUID || 'b83296c0-4534-4d85-8240-a30999554589';
const PATH = process.env.PATH || '/vless-ws';

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`
            <!DOCTYPE html>
            <html lang="ar" dir="rtl">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>لوحة تحكم السيرفر</title>
                <style>
                    body { font-family: Tahoma, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
                    h2 { color: #007bff; text-align: center; }
                    .status-box { background: #e9ecef; padding: 15px; border-radius: 6px; margin: 15px 0; }
                    .status-online { color: #28a745; font-weight: bold; }
                    .btn { display: block; width: 100%; padding: 12px; background: #007bff; color: white; text-align: center; text-decoration: none; border-radius: 5px; font-size: 16px; margin-top: 10px; border: none; cursor: pointer; }
                    .btn:hover { background: #0056b3; }
                    code { background: #fff; padding: 8px; border: 1px solid #ccc; display: block; margin-top: 5px; word-break: break-all; font-size: 14px; border-radius: 4px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>لوحة تحكم السيرفر</h2>
                    <div class="status-box">
                        <p>حالة السيرفر: <span class="status-online">متصل وشغال (Online)</span></p>
                        <p><strong>معلومات الاتصال (UUID):</strong></p>
                        <code>${UUID}</code>
                        <p style="margin-top: 10px;"><strong>مسار الاتصال (Path):</strong></p>
                        <code>${PATH}</code>
                    </div>
                    <a href="/" class="btn">تحديث الصفحة</a>
                </div>
            </body>
            </html>
        `);
    } else if (req.url === PATH) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('VLESS WebSocket Server is Running');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
