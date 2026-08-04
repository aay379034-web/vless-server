const http = require('http');

const PORT = process.env.PORT || 3000;
const UUID = process.env.UUID || 'b83296c0-4534-4d85-8240-a30999554589';
const WS_PATH = '/vless-ws';

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة بيع</title>
    <style>
        body { font-family: Tahoma, sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); margin: 0; padding: 15px; color: #fff; min-height: 100vh; }
        .container { max-width: 450px; margin: 0 auto; background: rgba(22, 19, 48, 0.85); padding: 20px; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }
        h2 { text-align: center; color: #fff; margin-bottom: 20px; font-size: 22px; }
        .cards-row { display: flex; gap: 10px; margin-bottom: 15px; }
        .card { flex: 1; background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.08); text-align: center; }
        .card h4 { margin: 0 0 10px 0; font-size: 14px; color: #b8b8d0; }
        .card .value { font-size: 18px; font-weight: bold; color: #00ffcc; }
        .info-box { background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 15px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 15px; }
        .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; align-items: center; }
        .info-row:last-child { margin-bottom: 0; }
        .badge-active { background: rgba(0, 255, 128, 0.15); color: #00ff80; padding: 3px 10px; border-radius: 20px; font-size: 12px; }
        .sub-section-title { font-size: 16px; margin: 20px 0 10px 0; color: #b8b8d0; text-align: center; font-weight: bold; }
        .link-box { background: rgba(0, 0, 0, 0.3); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 10px; }
        .link-title { font-size: 14px; margin-bottom: 8px; color: #00ffcc; font-weight: bold; text-align: center; }
        .link-content { display: flex; gap: 8px; }
        input[type="text"] { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; color: #fff; font-size: 12px; direction: ltr; text-align: left; }
        .copy-btn { background: #3b82f6; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <h2>منصة بيع</h2>
        <div class="cards-row">
            <div class="card">
                <h4>الاستهلاك</h4>
                <div class="value" style="color: #00ff80;">غير محدود</div>
            </div>
            <div class="card">
                <h4>الأيام المتبقية</h4>
                <div class="value">∞</div>
            </div>
        </div>
        <div class="info-box">
            <div class="info-row">
                <span>الحالة:</span>
                <span class="badge-active">فعال (Online)</span>
            </div>
            <div class="info-row">
                <span>الاستهلاك الكلي:</span>
                <span style="color: #ffaa00;">مفتوح</span>
            </div>
            <div class="info-row">
                <span>مسار الاتصال:</span>
                <span style="direction: ltr; color: #00ffcc; font-weight: bold;">${WS_PATH}</span>
            </div>
        </div>
        <div class="sub-section-title">منصة بيع</div>
        <div class="link-box">
            <div class="link-title">منصة بيع</div>
            <div class="link-content">
                <input type="text" id="vlessLink" value="vless://${UUID}@${req.headers.host || 'server'}?encryption=none&security=none&type=ws&path=${WS_PATH}#منصة-بيع" readonly>
                <button class="copy-btn" onclick="copyText()">نسخ</button>
            </div>
        </div>
    </div>
    <script>
        function copyText() {
            var copyText = document.getElementById("vlessLink");
            copyText.select();
            navigator.clipboard.writeText(copyText.value);
            alert("تم نسخ رابط الاشتراك بنجاح!");
        }
    </script>
</body>
</html>`);
    } else if (req.url === WS_PATH) {
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
