const http = require('http');

const PORT = process.env.PORT || 3000;
const WS_PATH = '/vless-ws';

// قائمة الأشخاص أو المستخدمين (يمكنك إضافة أو تعديل الأسماء والـ UUIDs كما ترغب)
const users = [
    { name: "أحمد", uuid: "b83296c0-4534-4d85-8240-a30999554589" },
    { name: "محمد", uuid: "1a2b3c4d-5678-90ab-cdef-123456789abc" },
    { name: "علي", uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7" }
];

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        // توليد HTML لكل المستخدمين تلقائياً
        let usersHtml = '';
        users.forEach((user, index) => {
            let link = `vless://${user.uuid}@${req.headers.host || 'server'}?encryption=none&security=none&type=ws&path=${WS_PATH}#${encodeURIComponent(user.name)}`;
            usersHtml += `
                <div class="link-box">
                    <div class="link-title">المشترك: ${user.name}</div>
                    <div class="link-content">
                        <input type="text" id="vlessLink${index}" value="${link}" readonly>
                        <button class="copy-btn" onclick="copyText('vlessLink${index}')">نسخ</button>
                    </div>
                </div>
            `;
        });

        res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة بيع - إدارة المشتركين</title>
    <style>
        body { font-family: Tahoma, sans-serif; background: linear-gradient(135deg, #0f0c29, #302b63, #24243e); margin: 0; padding: 15px; color: #fff; min-height: 100vh; }
        .container { max-width: 480px; margin: 0 auto; background: rgba(22, 19, 48, 0.85); padding: 20px; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); }
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
        .link-box { background: rgba(0, 0, 0, 0.3); padding: 12px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 12px; }
        .link-title { font-size: 14px; margin-bottom: 8px; color: #00ffcc; font-weight: bold; text-align: center; }
        .link-content { display: flex; gap: 8px; }
        input[type="text"] { flex: 1; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; color: #fff; font-size: 12px; direction: ltr; text-align: left; }
        .copy-btn { background: #3b82f6; color: white; border: none; padding: 8px 14px; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: bold; }
        .copy-btn:hover { background: #2563eb; }
    </style>
</head>
<body>
    <div class="container">
        <h2>منصة بيع - المشتركين</h2>
        <div class="cards-row">
            <div class="card">
                <h4>المشتركين</h4>
                <div class="value" style="color: #00ff80;">${users.length} نشط</div>
            </div>
            <div class="card">
                <h4>الاستهلاك</h4>
                <div class="value">غير محدود</div>
            </div>
        </div>
        <div class="info-box">
            <div class="info-row">
                <span>الحالة العامة:</span>
                <span class="badge-active">فعال (Online)</span>
            </div>
            <div class="info-row">
                <span>مسار الاتصال:</span>
                <span style="direction: ltr; color: #00ffcc; font-weight: bold;">${WS_PATH}</span>
            </div>
        </div>
        
        <div class="sub-section-title">روابط اشتراكات الأشخاص</div>
        ${usersHtml}
    </div>
    <script>
        function copyText(elementId) {
            var copyText = document.getElementById(elementId);
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
