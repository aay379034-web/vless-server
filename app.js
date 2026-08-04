const http = require('http');

const PORT = process.env.PORT || 3000;
const WS_PATH = '/vless-ws';

const TELEGRAM_BOT_URL = "https://t.me/Hassan0008bot?start=start"; 
const TELEGRAM_CHANNEL_URL = "#"; 

// روابط التطبيقات (يمكنك تعديلها لاحقاً بروابطك الخاصة)
const ANDROID_APP_URL = "#";
const IOS_APP_URL = "#";

const users = [
    { name: "بيع - ... 1", uuid: "b83296c0-4534-4d85-8240-a30999554589" },
    { name: "بيع - ... 2", uuid: "1a2b3c4d-5678-90ab-cdef-123456789abc" },
    { name: "بيع - ... 3", uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7" }
];

const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        let usersHtml = '';
        users.forEach((user, index) => {
            let link = `vless://${user.uuid}@${req.headers.host || 'server'}?encryption=none&security=none&type=ws&path=${WS_PATH}#${encodeURIComponent(user.name)}`;
            usersHtml += `
                <div class="link-card">
                    <div class="link-header">
                        <span class="link-name">${user.name}</span>
                        <div class="link-actions">
                            <button class="qr-btn" onclick="alert('رابط الـ UUID: ${user.uuid}')">qr</button>
                            <button class="copy-btn" onclick="copyText('vlessLink${index}')">نسخ</button>
                        </div>
                    </div>
                    <input type="text" id="vlessLink${index}" value="${link}" readonly>
                </div>
            `;
        });

        res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة بيع</title>
    <style>
        body { font-family: Tahoma, sans-serif; background: #000000; margin: 0; padding: 15px; color: #fff; min-height: 100vh; }
        .container { max-width: 450px; margin: 0 auto; background: #080808; padding: 20px; border-radius: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 1px solid rgba(255,255,255,0.1); }
        .main-title { text-align: center; font-size: 22px; font-weight: bold; margin-bottom: 20px; color: #ffffff; }
        
        .top-cards { display: flex; gap: 10px; margin-bottom: 15px; }
        .top-card { flex: 1; background: #121212; padding: 15px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); }
        .top-card-title { font-size: 13px; color: #a0a0a0; margin-bottom: 8px; display: flex; align-items: center; gap: 5px; }
        .top-card-value { font-size: 16px; font-weight: bold; color: #00ffc4; }
        .progress-bar { background: #222222; height: 6px; border-radius: 3px; margin-top: 8px; overflow: hidden; }
        .progress-fill { background: #00ffc4; height: 100%; width: 0%; }

        .info-box { background: #121212; padding: 15px; border-radius: 18px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 20px; }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 14px; color: #a0a0a0; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
        .info-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
        .badge-active { background: rgba(0, 255, 128, 0.15); color: #00ff80; padding: 3px 12px; border-radius: 20px; font-size: 12px; }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 15px; font-weight: bold; color: #fff; }
        .copy-all-btn { background: #121212; border: 1px solid rgba(255,255,255,0.1); color: #a0a0a0; padding: 5px 12px; border-radius: 10px; font-size: 12px; cursor: pointer; }

        .link-card { background: #121212; padding: 12px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 12px; }
        .link-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .link-name { font-size: 13px; color: #fff; font-weight: bold; }
        .link-actions { display: flex; gap: 6px; }
        .qr-btn { background: #222222; color: #fff; border: none; padding: 5px 10px; border-radius: 8px; cursor: pointer; font-size: 11px; }
        .copy-btn { background: #2563eb; color: #fff; border: none; padding: 5px 12px; border-radius: 8px; cursor: pointer; font-size: 11px; font-weight: bold; }
        .link-card input[type="text"] { width: 100%; background: #000000; border: 1px solid rgba(255,255,255,0.1); padding: 8px; border-radius: 8px; color: #888; font-size: 11px; direction: ltr; text-align: left; box-sizing: border-box; }

        .bottom-grid { display: flex; gap: 10px; margin-top: 20px; }
        .bottom-btn { flex: 1; background: #121212; border: 1px solid rgba(255,255,255,0.1); padding: 14px; border-radius: 16px; text-align: center; color: #fff; font-size: 13px; font-weight: bold; cursor: pointer; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 6px; }
        .full-btn { display: block; width: 100%; background: #121212; border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 16px; text-align: center; color: #fff; font-size: 13px; font-weight: bold; margin-top: 10px; cursor: pointer; text-decoration: none; box-sizing: border-box; }

        /* تنسيق النافذة المنبثقة (Modal) */
        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); z-index: 1000; justify-content: center; align-items: center; }
        .modal-box { background: #0c0c0e; border: 1px solid rgba(255,255,255,0.1); width: 90%; max-width: 380px; border-radius: 24px; padding: 20px; box-shadow: 0 15px 35px rgba(0,0,0,0.9); position: relative; box-sizing: border-box; }
        .modal-close { background: none; border: none; color: #aaa; font-size: 20px; cursor: pointer; position: absolute; top: 15px; left: 15px; }
        .modal-title { text-align: center; font-size: 16px; font-weight: bold; color: #fff; margin-bottom: 20px; margin-top: 5px; }
        .app-option-btn { display: flex; justify-content: space-between; align-items: center; background: #141418; border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 16px; margin-bottom: 12px; text-decoration: none; color: #fff; font-size: 14px; font-weight: bold; transition: 0.2s; }
        .app-option-btn:hover { background: #1a1a20; }
        .app-icon-text { display: flex; align-items: center; gap: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="main-title">منصة بيع</div>
        
        <div class="top-cards">
            <div class="top-card">
                <div class="top-card-title">📦 الاستهلاك</div>
                <div class="top-card-value">0 GB <span style="font-size:11px; color:#00ff80;">0%</span></div>
                <div class="progress-bar"><div class="progress-fill"></div></div>
            </div>
            <div class="top-card">
                <div class="top-card-title">⏳ الأيام المتبقية</div>
                <div class="top-card-value" style="color: #00ffc4;">غير محدود ∞</div>
            </div>
        </div>

        <div class="info-box">
            <div class="info-row">
                <span>الحالة:</span>
                <span class="badge-active">فعال</span>
            </div>
            <div class="info-row">
                <span>التنزيل:</span>
                <span style="color: #00ffc4;">0 GB</span>
            </div>
            <div class="info-row">
                <span>الرفع:</span>
                <span style="color: #00ffc4;">0 GB</span>
            </div>
            <div class="info-row">
                <span>الاستخدام الكلي:</span>
                <span style="color: #00ffc4;">0 GB</span>
            </div>
            <div class="info-row">
                <span>تاريخ الانتهاء:</span>
                <span>∞</span>
            </div>
        </div>

        <div class="section-header">
            <span>منصة بيع</span>
            <button class="copy-all-btn" onclick="alert('تم نسخ الكل')">نسخ الكل</button>
        </div>

        ${usersHtml}

        <div class="bottom-grid">
            <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" class="bottom-btn">💬 قناتنا على التليграм</a>
            <a href="${TELEGRAM_BOT_URL}" target="_blank" class="bottom-btn">🤖 الشراء المباشر من البوت</a>
        </div>
        <a href="#" class="full-btn">📖 طريقة الاستخدام</a>
        <a href="javascript:void(0);" onclick="openModal()" class="full-btn" style="background: #121212; color: #ffaa00;">📱 روابط التطبيقات</a>
    </div>

    <!-- نافذة روابط التطبيقات المنبثقة -->
    <div id="appsModal" class="modal-overlay">
        <div class="modal-box">
            <button class="modal-close" onclick="closeModal()">✕</button>
            <div class="modal-title">اختر نوع التطبيقات</div>
            
            <a href="${ANDROID_APP_URL}" target="_blank" class="app-option-btn" style="border-color: rgba(0,255,150,0.2);">
                <div class="app-icon-text">
                    <span style="font-size: 18px;">🤖</span>
                    <span style="color: #00ff96;">تطبيقات الأندرويد</span>
                </div>
                <span style="color: #00ff96; font-size: 16px;">‹</span>
            </a>

            <a href="${IOS_APP_URL}" target="_blank" class="app-option-btn" style="border-color: rgba(50,150,255,0.2);">
                <div class="app-icon-text">
                    <span style="font-size: 18px;">🍏</span>
                    <span style="color: #3b82f6;">تطبيقات الآيفون</span>
                </div>
                <span style="color: #3b82f6; font-size: 16px;">‹</span>
            </a>
        </div>
    </div>

    <script>
        function copyText(elementId) {
            var copyText = document.getElementById(elementId);
            copyText.select();
            navigator.clipboard.writeText(copyText.value);
            alert("تم نسخ رابط الاشتراك بنجاح!");
        }

        function openModal() {
            document.getElementById('appsModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('appsModal').style.display = 'none';
        }

        // إغلاق النافذة عند الضغط خارجها
        window.onclick = function(event) {
            var modal = document.getElementById('appsModal');
            if (event.target == modal) {
                modal.style.display = 'none';
            }
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
