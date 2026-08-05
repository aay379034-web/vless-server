const http = require('http');

const PORT = process.env.PORT || 3000;
const WS_PATH = '/vless-ws';

const TELEGRAM_BOT_URL = "https://t.me/Hassan0008bot?start=start"; 
const TELEGRAM_CHANNEL_URL = "#"; 

const users = [
    { name: "💎 اشتراك رقم 1", uuid: "b83296c0-4534-4d85-8240-a30999554589" },
    { name: "🚀 اشتراك رقم 2", uuid: "1a2b3c4d-5678-90ab-cdef-123456789abc" },
    { name: "🔥 اشتراك رقم 3", uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7" }
];

const server = http.createServer((req, res) => {
    if (req.url === '/api/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
            download: "1.45 GB",
            upload: "320 MB",
            total: "1.77 GB",
            limit: "100 GB",
            percentage: 2,
            status: "🟢 فعال وقيد التشغيل"
        }));
        return;
    }

    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        let usersHtml = '';
        users.forEach((user, index) => {
            let link = `vless://${user.uuid}@${req.headers.host || 'server'}?encryption=none&security=none&type=ws&path=${WS_PATH}#${encodeURIComponent(user.name)}`;
            usersHtml += `
                <div style="background: rgba(15, 23, 42, 0.6); padding: 14px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="font-size: 14px; color: #f1f5f9; font-weight: bold;">${user.name}</span>
                        <button onclick="copyText('vlessLink${index}')" style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: none; padding: 6px 14px; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: bold;">📋 نسخ</button>
                    </div>
                    <input type="text" id="vlessLink${index}" value="${link}" readonly style="width: 100%; background: #020617; border: 1px solid rgba(255,255,255,0.08); padding: 10px; border-radius: 10px; color: #64748b; font-size: 11px; direction: ltr; text-align: left; box-sizing: border-box;">
                </div>
            `;
        });

        res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>⚡ منصة بيع السيرفرات الذكية</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, sans-serif; background: #05080f; margin: 0; padding: 15px; color: #fff; min-height: 100vh; }
        .container { max-width: 450px; margin: 0 auto; background: rgba(18, 24, 38, 0.85); padding: 22px; border-radius: 28px; box-shadow: 0 20px 40px rgba(0,0,0,0.6); border: 1px solid rgba(255, 255, 255, 0.08); }
        .platform-logo { width: 90px; height: 90px; border-radius: 50%; border: 2px solid #00ffc4; object-fit: cover; display: block; margin: 0 auto 12px auto; box-shadow: 0 0 20px rgba(0, 255, 196, 0.3); }
        .main-title { text-align: center; font-size: 22px; font-weight: 800; margin-bottom: 20px; color: #00ffc4; }
        .info-box { background: rgba(255, 255, 255, 0.02); padding: 16px; border-radius: 18px; border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 18px; }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; font-size: 13px; color: #94a3b8; }
        .bottom-grid { display: flex; gap: 10px; margin-top: 15px; }
        .bottom-btn { flex: 1; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.08); padding: 14px; border-radius: 14px; text-align: center; color: #fff; font-size: 13px; font-weight: bold; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <img src="https://i.ibb.co/hL76735/1000169131-2.png" onerror="this.src='https://api.iconify.design/fluent-emoji:lightning-mood.svg'" class="platform-logo" alt="شعار">
        <div class="main-title">⚡ منصة بيع السيرفرات الذكية</div>
        
        <div class="info-box">
            <div class="info-row"><span>⚡ حالة السيرفر:</span><span style="color: #00ffc4; font-weight: bold;">🟢 فعال وقيد التشغيل</span></div>
            <div class="info-row"><span>📦 الاستهلاك الكلي:</span><span style="color: #38bdf8;">1.77 GB</span></div>
            <div class="info-row"><span>⏳ الصلاحية:</span><span style="color: #00ffc4;">∞ مدى الحياة</span></div>
        </div>

        <div style="font-size: 15px; font-weight: bold; margin-bottom: 12px; color: #f8fafc;">🔗 اشتراكات الـ VLESS</div>
        ${usersHtml}

        <div class="bottom-grid">
            <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" class="bottom-btn">💬 قناتنا</a>
            <a href="${TELEGRAM_BOT_URL}" target="_blank" class="bottom-btn">🤖 البوت</a>
        </div>
    </div>
    <script>
        function copyText(id) {
            var el = document.getElementById(id);
            el.select();
            navigator.clipboard.writeText(el.value);
            alert("📋 تم النسخ بنجاح!");
        }
    </script>
</body>
</html>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not Found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
