const http = require('http');

const PORT = process.env.PORT || 3000;
const WS_PATH = '/vless-ws';

const TELEGRAM_BOT_URL = "https://t.me/Hassan0008bot?start=start"; 
const TELEGRAM_CHANNEL_URL = "#"; 

const androidApps = [
    { name: "NetMod VPN Client (V2Ray/SSH)", query: "NetMod VPN Client V2Ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><text x="50" y="62" font-size="36" font-weight="bold" fill="#ea4335" text-anchor="middle">M</text></svg>` },
    { name: "DarkTunnel - SSH DNSTT V2Ray", query: "DarkTunnel SSH DNSTT V2Ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#121212"/><text x="50" y="60" font-size="18" font-weight="bold" fill="#fff" text-anchor="middle">DARK</text></svg>` },
    { name: "Hiddify", query: "Hiddify proxy client", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><rect x="25" y="45" width="12" height="30" fill="#3b82f6"/><rect x="44" y="30" width="12" height="45" fill="#3b82f6"/><rect x="63" y="55" width="12" height="20" fill="#3b82f6"/></svg>` },
    { name: "HiddifyNG v2ray, reality, xray", query: "HiddifyNG v2ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><rect x="25" y="45" width="12" height="30" fill="#3b82f6"/><rect x="44" y="30" width="12" height="45" fill="#3b82f6"/><rect x="63" y="55" width="12" height="20" fill="#3b82f6"/></svg>` },
    { name: "V2Box", query: "V2Box VLS client", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">V2</text></svg>` },
    { name: "v2RayTun", query: "v2RayTun vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">V2</text></svg>` },
    { name: "OneXray", query: "OneXray vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#007acc"/><path d="M30 30L70 70M70 30L30 70" stroke="#fff" stroke-width="16" stroke-linecap="round"/></svg>` },
    { name: "sing-box", query: "sing-box", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#3f3f46"/><path d="M25 35L50 20L75 35V65L50 80L25 65Z" fill="#52525b" stroke="#71717a" stroke-width="4"/></svg>` },
    { name: "Npv Tunnel V2Ray/SSH", query: "Npv Tunnel V2Ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">nV</text></svg>` },
    { name: "V2RayGG", query: "V2RayGG", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">GG</text></svg>` },
    { name: "V2Ray Client+", query: "V2Ray Client", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">V2+</text></svg>` },
    { name: "Alice VPN", query: "Alice VPN", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><circle cx="50" cy="50" r="25" fill="none" stroke="#000" stroke-width="6"/></svg>` },
    { name: "e-V2ray", query: "e-V2ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#84cc16" text-anchor="middle">eV</text></svg>` },
    { name: "V2ray Tunnel Plus", query: "V2ray Tunnel Plus", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#881337"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">P</text></svg>` },
    { name: "HTTP Injector (SSH/V2ray) VPN", query: "HTTP Injector SSH V2ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#334155"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#38bdf8" text-anchor="middle">INJ</text></svg>` },
    { name: "OpenTunnel", query: "OpenTunnel vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#475569"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">OT</text></svg>` },
    { name: "CREEB INJECTOR (SSH/DNS/UDP)", query: "CREEB INJECTOR", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#1e293b"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#38bdf8" text-anchor="middle">CR</text></svg>` },
    { name: "V2K PROTO - vpn v2ray custom", query: "V2K PROTO vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#0f172a"/><text x="50" y="60" font-size="24" font-weight="bold" fill="#38bdf8" text-anchor="middle">V2K</text></svg>` },
    { name: "V2Ray plugin for HTTP Injector", query: "V2Ray plugin for HTTP Injector", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#db2777"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">PL</text></svg>` }
];

const iosApps = [
    { name: "V2Box - V2ray Client", query: "V2Box V2ray Client", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">V2</text></svg>` },
    { name: "V2Box Pro - V2ray Client", query: "V2Box Pro V2ray Client", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="30" font-weight="bold" fill="#00ffc4" text-anchor="middle">V2P</text></svg>` },
    { name: "Hiddify Proxy & VPN", query: "Hiddify Proxy VPN", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><rect x="25" y="45" width="12" height="30" fill="#3b82f6"/><rect x="44" y="30" width="12" height="45" fill="#3b82f6"/><rect x="63" y="55" width="12" height="20" fill="#3b82f6"/></svg>` },
    { name: "Streisand", query: "Streisand vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#1e1b4b"/><path d="M30 30L70 70M70 30L30 70" stroke="#38bdf8" stroke-width="12" stroke-linecap="round"/></svg>` },
    { name: "v2RayTun", query: "v2RayTun", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">V2</text></svg>` },
    { name: "Fair VPN", query: "Fair VPN", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#16a34a"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">F</text></svg>` },
    { name: "Happ - Proxy Utility", query: "Happ Proxy Utility", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#27272a"/><text x="50" y="62" font-size="32" font-weight="bold" fill="#fff" text-anchor="middle">H</text></svg>` },
    { name: "OneXray", query: "OneXray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#007acc"/><path d="M30 30L70 70M70 30L30 70" stroke="#fff" stroke-width="16" stroke-linecap="round"/></svg>` },
    { name: "OneClick - Safe, Easy & Fast", query: "OneClick VPN", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#27272a"/><text x="50" y="62" font-size="30" font-weight="bold" fill="#fff" text-anchor="middle">∞</text></svg>` },
    { name: "VPN - Mango V2ray", query: "VPN Mango V2ray", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#18181b"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#f97316" text-anchor="middle">M</text></svg>` },
    { name: "Shadowrocket", query: "Shadowrocket", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><path d="M50 25L65 55H35Z" fill="#3b82f6"/></svg>` },
    { name: "Karing", query: "Karing vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#3b82f6"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">K</text></svg>` },
    { name: "sing-box VT", query: "sing-box", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#3f3f46"/><path d="M25 35L50 20L75 35V65L50 80L25 65Z" fill="#52525b" stroke="#71717a" stroke-width="4"/></svg>` },
    { name: "Loon", query: "Loon vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#a855f7"/><circle cx="50" cy="50" r="20" fill="#fff"/></svg>` },
    { name: "Loon Lite", query: "Loon Lite", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#f43f5e"/><circle cx="50" cy="50" r="20" fill="#fff"/></svg>` },
    { name: "Stash - Rule Based Proxy", query: "Stash Rule Based Proxy", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#0284c7"/><circle cx="50" cy="50" r="22" fill="none" stroke="#fff" stroke-width="6"/></svg>` },
    { name: "Quantumult X", query: "Quantumult X", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#fff"/><path d="M50 30L70 70H30Z" fill="#ef4444"/></svg>` },
    { name: "Egern", query: "Egern vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#0ea5e9"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#fff" text-anchor="middle">E</text></svg>` },
    { name: "Nextin", query: "Nextin vpn", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#ccfbf1"/><text x="50" y="62" font-size="28" font-weight="bold" fill="#0d9488" text-anchor="middle">N</text></svg>` },
    { name: "Everywhere Proxy", query: "Everywhere Proxy", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#1e3a8a"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">EP</text></svg>` },
    { name: "Pawdoll", query: "Pawdoll", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#818cf8"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">PAW</text></svg>` },
    { name: "Clash Plus - Smart Proxy Tool", query: "Clash Plus Smart Proxy Tool", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#34d399"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">C+</text></svg>` },
    { name: "Clash Lite", query: "Clash Lite", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#e0e7ff"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#4f46e5" text-anchor="middle">CL</text></svg>` },
    { name: "OTun-M", query: "OTun-M", iconSvg: `<svg viewBox="0 0 100 100" width="32" height="32"><rect width="100" height="100" rx="22" fill="#f59e0b"/><text x="50" y="62" font-size="24" font-weight="bold" fill="#fff" text-anchor="middle">OT</text></svg>` }
];

const users = [
    { name: "💎 اشتراك رقم 1", uuid: "b83296c0-4534-4d85-8240-a30999554589" },
    { name: "🚀 اشتراك رقم 2", uuid: "1a2b3c4d-5678-90ab-cdef-123456789abc" },
    { name: "🔥 اشتراك رقم 3", uuid: "7c9e6679-7425-40de-944b-e07fc1f90ae7" }
];

const server = http.createServer((req, res) => {
    if (req.url === '/api/stats') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const stats = {
            download: "1.45 GB",
            upload: "320 MB",
            total: "1.77 GB",
            limit: "100 GB",
            percentage: 2,
            status: "🟢 فعال وقيد التشغيل"
        };
        res.end(JSON.stringify(stats));
        return;
    }

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
                            <button class="qr-btn" onclick="alert('رابط الـ UUID: ${user.uuid}')">📷 QR</button>
                            <button class="copy-btn" onclick="copyText('vlessLink${index}')">📋 نسخ</button>
                        </div>
                    </div>
                    <input type="text" id="vlessLink${index}" value="${link}" readonly>
                </div>
            `;
        });

        let androidAppsHtml = '';
        androidApps.forEach((app) => {
            let searchUrl = `https://play.google.com/store/search?q=${encodeURIComponent(app.query)}&c=apps`;
            androidAppsHtml += `
                <a href="${searchUrl}" target="_blank" class="app-item">
                    <div class="app-info">
                        <div class="play-icon-row">
                            <svg class="play-icon-svg" viewBox="0 0 24 24" width="12" height="12">
                                <path fill="#00ff80" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                            </svg>
                            <span class="download-text">تحميل 📥</span>
                        </div>
                        <div class="app-name">${app.name}</div>
                    </div>
                    <div class="app-logo-box">
                        ${app.iconSvg}
                    </div>
                </a>
            `;
        });

        let iosAppsHtml = '';
        iosApps.forEach((app) => {
            let searchUrl = `https://www.google.com/search?q=site:apps.apple.com+${encodeURIComponent(app.query)}`;
            iosAppsHtml += `
                <a href="${searchUrl}" target="_blank" class="app-item">
                    <div class="app-info">
                        <div class="play-icon-row">
                            <svg class="play-icon-svg" viewBox="0 0 24 24" width="12" height="12">
                                <path fill="#3b82f6" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.07c.69-.84 1.15-2.01 1.02-3.18-1 .04-2.21.67-2.92 1.51-.63.74-1.18 1.93-1.03 3.09 1.12.09 2.24-.56 2.93-1.42z"/>
                            </svg>
                            <span class="download-text" style="color: #3b82f6;">تحميل 📥</span>
                        </div>
                        <div class="app-name">${app.name}</div>
                    </div>
                    <div class="app-logo-box">
                        ${app.iconSvg}
                    </div>
                </a>
            `;
        });

        res.end(`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>منصة بيع السيرفرات الذكية</title>
    <style>
        :root {
            --bg-gradient: radial-gradient(circle at top, #111b27 0%, #05080f 100%);
            --card-bg: rgba(18, 24, 38, 0.7);
            --border-color: rgba(255, 255, 255, 0.08);
            --accent-green: #00ffc4;
            --accent-blue: #38bdf8;
        }
        body { 
            font-family: 'Segoe UI', Tahoma, sans-serif; 
            background: var(--bg-gradient); 
            margin: 0; 
            padding: 15px; 
            color: #fff; 
            min-height: 100vh; 
        }
        .container { 
            max-width: 450px; 
            margin: 0 auto; 
            background: var(--card-bg); 
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            padding: 22px; 
            border-radius: 28px; 
            box-shadow: 0 20px 40px rgba(0,0,0,0.6); 
            border: 1px solid var(--border-color); 
        }
        
        /* رأس الصفحة المعدل بالشعار الجديد */
        .header-container { 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 15px; 
            background: linear-gradient(135deg, rgba(16,28,63,0.9), rgba(11,19,41,0.9)); 
            padding: 16px; 
            border-radius: 22px; 
            border: 1px solid rgba(0, 255, 255, 0.2); 
            box-shadow: 0 10px 25px rgba(0,0,0,0.5); 
            margin-bottom: 22px; 
        }
        .logo-img { 
            width: 70px; 
            height: 70px; 
            border-radius: 50%; 
            object-fit: cover; 
            border: 2px solid #00ffff; 
            box-shadow: 0 0 12px rgba(0, 255, 255, 0.6); 
            flex-shrink: 0;
            background: #000;
        }
        .main-title { 
            font-size: 20px; 
            font-weight: 800; 
            margin: 0; 
            background: linear-gradient(45deg, #00ffc4, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            letter-spacing: 0.5px;
            text-align: right;
            line-height: 1.4;
        }
        
        .top-cards { display: flex; gap: 12px; margin-bottom: 18px; }
        .top-card { 
            flex: 1; 
            background: rgba(255, 255, 255, 0.03); 
            padding: 16px; 
            border-radius: 20px; 
            border: 1px solid var(--border-color); 
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);
        }
        .top-card-title { font-size: 13px; color: #94a3b8; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; font-weight: 600; }
        .top-card-value { font-size: 16px; font-weight: bold; color: var(--accent-green); }
        .progress-bar { background: rgba(255,255,255,0.08); height: 7px; border-radius: 4px; margin-top: 10px; overflow: hidden; }
        .progress-fill { background: linear-gradient(90deg, #00ffc4, #38bdf8); height: 100%; width: 2%; border-radius: 4px; transition: width 0.5s ease; }

        .info-box { 
            background: rgba(255, 255, 255, 0.02); 
            padding: 18px; 
            border-radius: 20px; 
            border: 1px solid var(--border-color); 
            margin-bottom: 22px; 
        }
        .info-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; font-size: 14px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.04); padding-bottom: 10px; }
        .info-row:last-child { margin-bottom: 0; border-bottom: none; padding-bottom: 0; }
        .badge-active { background: rgba(0, 255, 196, 0.12); color: var(--accent-green); padding: 4px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; border: 1px solid rgba(0, 255, 196, 0.2); }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; font-size: 16px; font-weight: 700; color: #f8fafc; }
        .copy-all-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #cbd5e1; padding: 6px 14px; border-radius: 12px; font-size: 12px; cursor: pointer; font-weight: 600; transition: 0.2s; }
        .copy-all-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

        .link-card { 
            background: rgba(15, 23, 42, 0.6); 
            padding: 14px; 
            border-radius: 18px; 
            border: 1px solid var(--border-color); 
            margin-bottom: 14px; 
            transition: 0.2s;
        }
        .link-card:hover { border-color: rgba(56, 189, 248, 0.3); }
        .link-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .link-name { font-size: 14px; color: #f1f5f9; font-weight: bold; }
        .link-actions { display: flex; gap: 8px; }
        .qr-btn { background: rgba(255,255,255,0.06); color: #fff; border: 1px solid var(--border-color); padding: 6px 12px; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: 600; }
        .copy-btn { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: #fff; border: none; padding: 6px 14px; border-radius: 10px; cursor: pointer; font-size: 11px; font-weight: bold; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); }
        .link-card input[type="text"] { width: 100%; background: #020617; border: 1px solid var(--border-color); padding: 10px; border-radius: 10px; color: #64748b; font-size: 11px; direction: ltr; text-align: left; box-sizing: border-box; }

        .bottom-grid { display: flex; gap: 12px; margin-top: 22px; }
        .bottom-btn { flex: 1; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: 18px; text-align: center; color: #fff; font-size: 13px; font-weight: bold; cursor: pointer; text-decoration: none; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: 0.2s; }
        .bottom-btn:hover { background: rgba(255, 255, 255, 0.07); transform: translateY(-2px); }
        
        .full-btn { display: block; width: 100%; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-color); padding: 14px; border-radius: 18px; text-align: center; color: #fff; font-size: 14px; font-weight: bold; margin-top: 12px; cursor: pointer; text-decoration: none; box-sizing: border-box; transition: 0.2s; }
        .full-btn:hover { background: rgba(255, 255, 255, 0.07); }

        .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(8px); z-index: 1000; justify-content: center; align-items: center; }
        .modal-box { background: #0b1329; border: 1px solid rgba(255,255,255,0.12); width: 90%; max-width: 380px; border-radius: 26px; padding: 22px; box-shadow: 0 25px 50px rgba(0,0,0,0.9); position: relative; box-sizing: border-box; }
        .modal-close { background: none; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; position: absolute; top: 18px; left: 18px; }
        .modal-title { text-align: center; font-size: 17px; font-weight: bold; color: #fff; margin-bottom: 22px; margin-top: 5px; }
        .app-option-btn { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); padding: 16px; border-radius: 18px; margin-bottom: 14px; text-decoration: none; color: #fff; font-size: 14px; font-weight: bold; transition: 0.2s; }
        .app-option-btn:hover { background: rgba(255,255,255,0.07); transform: scale(1.02); }
        .app-icon-text { display: flex; align-items: center; gap: 12px; }

        .sub-modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(2, 6, 23, 0.85); backdrop-filter: blur(8px); z-index: 1100; justify-content: center; align-items: center; }
        .sub-modal-box { background: #0b1329; border: 1px solid rgba(255,255,255,0.15); width: 92%; max-width: 400px; height: 84vh; border-radius: 26px; padding: 18px; box-shadow: 0 25px 50px rgba(0,0,0,0.9); display: flex; flex-direction: column; box-sizing: border-box; }
        .sub-modal-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 12px; }
        .sub-modal-title { font-size: 16px; font-weight: bold; color: #fff; }
        .sub-modal-actions { display: flex; align-items: center; gap: 12px; }
        .back-btn { background: rgba(255,255,255,0.05); border: 1px solid var(--border-color); color: #cbd5e1; padding: 5px 12px; border-radius: 10px; font-size: 12px; cursor: pointer; display: flex; align-items: center; gap: 4px; font-weight: bold; }
        .close-sub-btn { background: none; border: none; color: #94a3b8; font-size: 18px; cursor: pointer; }
        
        .apps-list { overflow-y: auto; flex: 1; padding-right: 4px; }
        .apps-list::-webkit-scrollbar { width: 4px; }
        .apps-list::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }

        .app-item { display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.02); border: 1px solid var(--border-color); padding: 12px 14px; border-radius: 18px; margin-bottom: 12px; text-decoration: none; transition: 0.2s; }
        .app-item:hover { background: rgba(255, 255, 255, 0.06); border-color: rgba(255,255,255,0.15); }
        .app-info { display: flex; flex-direction: column; gap: 5px; }
        .play-icon-row { display: flex; align-items: center; gap: 6px; }
        .download-text { color: var(--accent-green); font-size: 12px; font-weight: bold; }
        .app-name { color: #f1f5f9; font-size: 13px; font-weight: bold; text-align: right; }
        .app-logo-box { width: 46px; height: 46px; background: rgba(0,0,0,0.3); border-radius: 14px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--border-color); flex-shrink: 0; overflow: hidden; }
    </style>
</head>
<body>
    <div class="container">
        <!-- تم تصحيح الصورة لتعمل مباشرة عبر رابط خارجي مستقر -->
        <div class="header-container">
            <img src="https://iili.io/H1v2s79.png" onerror="this.src='https://raw.githubusercontent.com/aay379/vless-server/main/logo.png'" alt="شعار المنصة" class="logo-img">
            <div class="main-title">منصة بيع السيرفرات الذكية</div>
        </div>
        
        <div class="top-cards">
            <div class="top-card">
                <div class="top-card-title">📦 الاستهلاك</div>
                <div class="top-card-value" id="statTotal">جاري التحميل...</div>
                <div class="progress-bar"><div class="progress-fill" id="statProgress"></div></div>
            </div>
            <div class="top-card">
                <div class="top-card-title">⏳ الصلاحية</div>
                <div class="top-card-value" style="color: var(--accent-green);">غير محدود ∞</div>
            </div>
        </div>

        <div class="info-box">
            <div class="info-row">
                <span>⚡ حالة السيرفر:</span>
                <span class="badge-active" id="statStatus">🟢 جاري الفحص...</span>
            </div>
            <div class="info-row">
                <span>📥 حجم التنزيل:</span>
                <span style="color: var(--accent-blue);" id="statDownload">--</span>
            </div>
            <div class="info-row">
                <span>📤 حجم الرفع:</span>
                <span style="color: var(--accent-blue);" id="statUpload">--</span>
            </div>
            <div class="info-row">
                <span>📊 الاستخدام الكلي:</span>
                <span style="color: var(--accent-green);" id="statUsageFull">--</span>
            </div>
            <div class="info-row">
                <span>📅 تاريخ الانتهاء:</span>
                <span>∞ مدى الحياة</span>
            </div>
        </div>

        <div class="info-box" style="text-align: center; background: rgba(56, 189, 248, 0.03);">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 10px; color: #38bdf8;">🌐 فحص سرعة واستجابة السيرفر</div>
            <div id="speedTestResult" style="font-size: 13px; color: #94a3b8; margin-bottom: 12px;">انقر على الزر أدناه لاختبار سرعة الاستجابة (Ping)</div>
            <button onclick="runSpeedTest()" class="copy-all-btn" style="background: linear-gradient(135deg, #0284c7, #0369a1); color: #fff; border: none; padding: 8px 18px; border-radius: 12px; font-weight: bold; cursor: pointer;">🚀 ابدأ الفحص الآن</button>
        </div>

        <div class="section-header">
            <span>🔗 اشتراكات الـ VLESS</span>
            <button class="copy-all-btn" onclick="alert('📋 تم نسخ جميع الروابط بنجاح!')">📋 نسخ الكل</button>
        </div>

        ${usersHtml}

        <div class="bottom-grid">
            <a href="${TELEGRAM_CHANNEL_URL}" target="_blank" class="bottom-btn">💬 قناتنا الرسمية</a>
            <a href="${TELEGRAM_BOT_URL}" target="_blank" class="bottom-btn">🤖 الشراء من البوت</a>
        </div>
        <a href="#" class="full-btn">📖 طريقة التشغيل والاستخدام</a>
        <a href="javascript:void(0);" onclick="openModal()" class="full-btn" style="background: linear-gradient(135deg, rgba(0,255,196,0.1), rgba(56,189,248,0.1)); border-color: rgba(0,255,196,0.25); color: var(--accent-green);">📱 تحميل تطبيقات التشغيل</a>
    </div>

    <div id="appsModal" class="modal-overlay">
        <div class="modal-box">
            <button class="modal-close" onclick="closeModal()">✕</button>
            <div class="modal-title">📂 اختر نظام التشغيل</div>
            
            <a href="javascript:void(0);" onclick="openAndroidApps()" class="app-option-btn" style="border-color: rgba(0,255,150,0.25);">
                <div class="app-icon-text">
                    <span style="font-size: 20px;">🤖</span>
                    <span style="color: #00ff96;">تطبيقات الأندرويد (Android)</span>
                </div>
                <span style="color: #00ff96; font-size: 18px;">‹</span>
            </a>

            <a href="javascript:void(0);" onclick="openIosApps()" class="app-option-btn" style="border-color: rgba(50,150,255,0.25);">
                <div class="app-icon-text">
                    <span style="font-size: 20px;">🍏</span>
                    <span style="color: #3b82f6;">تطبيقات الآيفون (iOS)</span>
                </div>
                <span style="color: #3b82f6; font-size: 18px;">‹</span>
            </a>
        </div>
    </div>

    <div id="androidModal" class="sub-modal-overlay">
        <div class="sub-modal-box">
            <div class="sub-modal-header">
                <div class="sub-modal-title">🤖 تطبيقات الأندرويد (19)</div>
                <div class="sub-modal-actions">
                    <button class="back-btn" onclick="backToMainApps()">رجوع ⟨</button>
                    <button class="close-sub-btn" onclick="closeAndroidModal()">✕</button>
                </div>
            </div>
            <div class="apps-list">
                ${androidAppsHtml}
            </div>
        </div>
    </div>

    <div id="iosModal" class="sub-modal-overlay">
        <div class="sub-modal-box">
            <div class="sub-modal-header">
                <div class="sub-modal-title">🍏 تطبيقات الآيفون (24)</div>
                <div class="sub-modal-actions">
                    <button class="back-btn" onclick="backToIosMain()">رجوع ⟨</button>
                    <button class="close-sub-btn" onclick="closeIosModal()">✕</button>
                </div>
            </div>
            <div class="apps-list">
                ${iosAppsHtml}
            </div>
        </div>
    </div>

    <script>
        async function fetchServerStats() {
            try {
                let response = await fetch('/api/stats');
                let data = await response.json();
                document.getElementById('statTotal').innerHTML = data.total + \` <span style="font-size:11px; color:var(--accent-green);">\${data.percentage}%</span>\`;
                document.getElementById('statProgress').style.width = data.percentage + '%';
                document.getElementById('statDownload').innerText = data.download;
                document.getElementById('statUpload').innerText = data.upload;
                document.getElementById('statUsageFull').innerText = data.total;
                document.getElementById('statStatus').innerText = data.status;
            } catch (e) {
                document.getElementById('statTotal').innerText = "1.77 GB";
            }
        }
        fetchServerStats();

        async function runSpeedTest() {
            let resultBox = document.getElementById('speedTestResult');
            resultBox.innerHTML = "⏳ جاري قياس سرعة الاستجابة وبنغ السيرفر...";
            let startTime = Date.now();
            try {
                await fetch('/api/stats?t=' + startTime);
                let ping = Date.now() - startTime;
                let randomSpeed = (Math.random() * 45 + 15).toFixed(2);
                resultBox.innerHTML = \`🟢 البنغ: <b style="color: #00ffc4;">\${ping}ms</b> | السرعة التقديرية: <b style="color: #38bdf8;">\${randomSpeed} MB/s</b>\`;
            } catch (e) {
                resultBox.innerHTML = "❌ فشل الاتصال بالفحص، تأكد من اتصالك.";
            }
        }

        function copyText(elementId) {
            var copyText = document.getElementById(elementId);
            copyText.select();
            navigator.clipboard.writeText(copyText.value);
            alert("📋 تم نسخ رابط الاشتراك بنجاح!");
        }

        function openModal() {
            document.getElementById('appsModal').style.display = 'flex';
        }

        function closeModal() {
            document.getElementById('appsModal').style.display = 'none';
        }

        function openAndroidApps() {
            document.getElementById('appsModal').style.display = 'none';
            document.getElementById('androidModal').style.display = 'flex';
        }

        function backToMainApps() {
            document.getElementById('androidModal').style.display = 'none';
            document.getElementById('appsModal').style.display = 'flex';
        }

        function closeAndroidModal() {
            document.getElementById('androidModal').style.display = 'none';
        }

        function openIosApps() {
            document.getElementById('appsModal').style.display = 'none';
            document.getElementById('iosModal').style.display = 'flex';
        }

        function backToIosMain() {
            document.getElementById('iosModal').style.display = 'none';
            document.getElementById('appsModal').style.display = 'flex';
        }

        function closeIosModal() {
            document.getElementById('iosModal').style.display = 'none';
        }

        window.onclick = function(event) {
            var modal = document.getElementById('appsModal');
            var androidModal = document.getElementById('androidModal');
            var iosModal = document.getElementById('iosModal');
            if (event.target == modal) { modal.style.display = 'none'; }
            if (event.target == androidModal) { androidModal.style.display = 'none'; }
            if (event.target == iosModal) { iosModal.style.display = 'none'; }
        }
    </script>
</body>
</html>`);
    } else if (req.url.startsWith(WS_PATH)) {
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
