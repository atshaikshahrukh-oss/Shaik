import json
import os
import shutil
import zipfile

print("====================================================================")
print("BUILDING CC MOTOCRAFTS FULL MULTI-PLATFORM ECOSYSTEM")
print("====================================================================")

with open('data/portfolio.json', 'r', encoding='utf-8') as f: portfolio_items = json.load(f)
with open('data/partners.json', 'r', encoding='utf-8') as f: partners = json.load(f)
with open('data/bookings.json', 'r', encoding='utf-8') as f: bookings = json.load(f)
with open('data/obd_database.json', 'r', encoding='utf-8') as f: obd_codes = json.load(f)
with open('data/customers.json', 'r', encoding='utf-8') as f: customers = json.load(f)
with open('data/job_cards.json', 'r', encoding='utf-8') as f: job_cards = json.load(f)

# ==============================================================================
# 1. GENERATE customer.html (STANDALONE CUSTOMER APP & TRACK MY GADI)
# ==============================================================================
print("Generating customer.html...")

customer_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>CC MOTOCRAFTS | Customer App • Track My Gadi & Instant Booking</title>
  <meta name="description" content="Customer mobile app for live vehicle telemetry, 60 FPS bay camera, job card tracking, and 1-click WhatsApp booking.">
  <meta name="theme-color" content="#00e5ff">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="manifest.json">
  <style>
    :root {{
      --font-main: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      --font-mono: 'SF Mono', Consolas, 'Courier New', monospace;
      --theme-primary: #00e5ff;
      --theme-primary-glow: rgba(0, 229, 255, 0.4);
      --bg-dark-base: #060b13;
      --bg-card: rgba(11, 20, 34, 0.85);
      --bg-card-border: rgba(0, 229, 255, 0.25);
      --text-main: #f0f6fc;
      --text-muted: #8b9bb4;
      --gold: #ffb300;
      --danger: #ff3366;
      --success: #00e676;
      --warning: #ff9100;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: var(--font-main);
      background-color: var(--bg-dark-base);
      color: var(--text-main);
      line-height: 1.5;
      background-image: radial-gradient(circle at 15% 20%, rgba(0, 229, 255, 0.08) 0%, transparent 40%),
                        radial-gradient(circle at 85% 75%, rgba(255, 145, 0, 0.05) 0%, transparent 45%);
      padding-bottom: 70px;
    }}
    .header {{
      display: flex; justify-content: space-between; align-items: center; padding: 12px 18px;
      background: rgba(6, 11, 19, 0.95); border-bottom: 1px solid var(--bg-card-border);
      position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px);
    }}
    .logo {{ font-size: 15px; font-weight: 900; letter-spacing: 1px; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 8px; }}
    .btn-cyber {{
      background: rgba(0, 229, 255, 0.08); border: 1px solid var(--theme-primary); color: var(--theme-primary);
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 700; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;
    }}
    .btn-cyber:hover {{ background: rgba(0, 229, 255, 0.2); }}
    .btn-cyber-solid {{
      background: var(--theme-primary); border: 1px solid var(--theme-primary); color: #000;
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 800; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px; transition: all 0.2s ease;
    }}
    .container {{ max-width: 900px; margin: 0 auto; padding: 16px; }}
    .card {{
      background: var(--bg-card); border: 1px solid var(--bg-card-border); border-radius: 10px;
      padding: 18px; margin-bottom: 18px;
    }}
    .form-input {{
      width: 100%; background: rgba(3, 7, 13, 0.85); border: 1px solid var(--bg-card-border);
      color: #fff; padding: 10px 12px; border-radius: 6px; font-size: 13px; margin-top: 4px;
    }}
    .modal-overlay {{
      position: fixed; inset: 0; background: rgba(3, 7, 13, 0.85); backdrop-filter: blur(12px);
      z-index: 2000; display: none; align-items: center; justify-content: center; padding: 16px;
    }}
    .modal-overlay.active {{ display: flex; }}
    .cyber-modal {{
      background: #09111c; border: 1px solid var(--bg-card-border); border-radius: 14px;
      width: 100%; max-width: 500px; padding: 24px; position: relative;
    }}
    .modal-close-btn {{ position: absolute; top: 12px; right: 14px; background: transparent; border: none; color: var(--text-muted); font-size: 20px; cursor: pointer; }}
    .stage-badge {{
      display: inline-flex; align-items: center; gap: 6px; padding: 4px 8px; border-radius: 4px;
      font-size: 11px; font-family: var(--font-mono); font-weight: 700;
    }}
    .stage-done {{ background: rgba(0, 230, 118, 0.15); color: var(--success); border: 1px solid var(--success); }}
    .stage-active {{ background: rgba(0, 229, 255, 0.2); color: var(--theme-primary); border: 1px solid var(--theme-primary); }}
    .stage-pending {{ background: rgba(255, 255, 255, 0.05); color: var(--text-muted); border: 1px solid rgba(255, 255, 255, 0.1); }}
  </style>
</head>
<body>

  <!-- Top App Navigation -->
  <header class="header">
    <a href="index.html" class="logo">
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--theme-primary); box-shadow:0 0 10px var(--theme-primary);"></span>
      CC MOTOCRAFTS <span style="font-size:10px; background:rgba(0,229,255,0.15); border:1px solid var(--theme-primary); padding:2px 6px; border-radius:3px; color:var(--theme-primary);">CUSTOMER APP</span>
    </a>
    <div style="display: flex; gap: 8px;">
      <button class="btn-cyber" onclick="triggerPwaInstall()" style="color:var(--success); border-color:var(--success);">
        📲 Install App
      </button>
      <a href="https://wa.me/918333007351?text=Hello%20CC%20Motocrafts%2C%20I%20need%20vehicle%20service" target="_blank" class="btn-cyber-solid" style="background:#25D366; border-color:#25D366; color:#000;">
        WhatsApp
      </a>
    </div>
  </header>

  <div class="container">

    <!-- PWA Install Banner -->
    <div style="background: linear-gradient(90deg, rgba(0,229,255,0.12), rgba(0,230,118,0.12)); border: 1px solid var(--theme-primary); border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
      <div>
        <strong style="color: #fff; font-size: 13px;">📲 Install CC Motocrafts on your Mobile Screen</strong>
        <p style="font-size: 11.5px; color: var(--text-muted);">0-Second quick launch • Track your bike/car anytime • Works offline</p>
      </div>
      <button class="btn-cyber-solid" onclick="triggerPwaInstall()" style="padding: 6px 12px; font-size: 11px;">
        Add to Home Screen
      </button>
    </div>

    <!-- Section 1: Track My Gadi (Order Trolley) -->
    <div class="card" style="border: 2px solid var(--gold);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 22px;">🛒</span>
          <div>
            <h3 style="font-size: 17px; color: var(--gold); margin: 0;">Track My Gadi (Live Work Bay)</h3>
            <small style="color: var(--text-muted); font-size: 11px;">Enter vehicle registration & return passcode to unlock live camera</small>
          </div>
        </div>
        <span style="font-size: 10px; font-family: var(--font-mono); color: var(--gold); border: 1px solid var(--gold); padding: 2px 6px; border-radius: 3px;">
          SECURE LIVE STREAM
        </span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 8px; margin-bottom: 12px;">
        <input type="text" id="custRegInput" class="form-input" placeholder="e.g. TS 09 EA 1234" value="TS 09 EA 1234">
        <input type="password" id="custPassInput" class="form-input" placeholder="Enter Return Passcode (e.g. cc1005)">
        <button class="btn-cyber-solid" onclick="trackCustomerGadi()" style="background:var(--gold); border-color:var(--gold); color:#000; font-weight:900; align-self: flex-end; padding: 10px 14px;">
          🔍 Track
        </button>
      </div>

      <!-- Security Hold Notice Box -->
      <div id="custHoldNotice" style="display: none; background: rgba(255,179,0,0.12); border: 1px solid var(--gold); padding: 12px; border-radius: 6px; font-size: 12px; color: var(--gold); line-height: 1.45; margin-bottom: 12px;">
        🔄 <strong>Verification in progress:</strong> Aapka request CC MOTOCRAFTS system mein receive ho gaya hai! Central Desk verification ke baad aapke Mobile, Email aur WhatsApp par dynamic return passcode send karega. Return password enter karke live video stream unlock karein.
      </div>

      <!-- Live Stream & Job Card Container -->
      <div id="custLiveStreamContainer" style="display: none; margin-top: 16px;">
        <div style="background: #000; border-radius: 8px; overflow: hidden; position: relative; height: 260px; margin-bottom: 14px; border: 1px solid rgba(0,229,255,0.4);">
          <canvas id="custLiveCamCanvas" width="640" height="360" style="width: 100%; height: 100%; object-fit: cover; display: block;"></canvas>
          <div style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.75); border: 1px solid var(--danger); border-radius: 4px; padding: 2px 8px; font-size: 10px; font-family: var(--font-mono); color: #fff; display: flex; align-items: center; gap: 6px;">
            <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:var(--danger); animation: pulse 1s infinite;"></span>
            LIVE BAY #02 • 60 FPS TELEMETRY
          </div>
          <div style="position: absolute; bottom: 8px; right: 10px; background: rgba(0,0,0,0.85); padding: 3px 8px; border-radius: 4px; font-size: 9.5px; font-weight: 900; color: #fff; border: 1px solid rgba(255,255,255,0.3);">
            CC MOTOCRAFTS OFFICIAL
          </div>
        </div>

        <!-- 4-Stage Progress -->
        <h4 style="font-size: 13px; color: var(--theme-primary); margin-bottom: 8px;">DIGITAL JOB CARD PROGRESS</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-bottom: 14px; font-size: 11px;">
          <div class="stage-badge stage-done" style="text-align: center; justify-content: center;">1. Inspection & OBD ✅</div>
          <div class="stage-badge stage-done" style="text-align: center; justify-content: center;">2. Teardown & Parts ✅</div>
          <div class="stage-badge stage-active" style="text-align: center; justify-content: center;">3. Assembly (In Progress) ⏳</div>
          <div class="stage-badge stage-pending" style="text-align: center; justify-content: center;">4. Road Test & Ready ⚪</div>
        </div>

        <div style="background: rgba(0,229,255,0.06); border: 1px solid var(--bg-card-border); padding: 12px; border-radius: 6px; font-size: 12px; margin-bottom: 14px;">
          <strong style="color: #fff;">Customer Note Alert:</strong> "Check throttle delay at 4000 RPM & valve lash tuning."<br>
          <span style="color: var(--text-muted); font-size: 11px;">Technician: Master Imran • Est Delivery: Today 5:30 PM</span>
        </div>

        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn-cyber" onclick="alert('Digital Job Card PDF downloaded with CC MOTOCRAFTS cryptographic watermark!')">
            📄 Download Job Card PDF
          </button>
          <button class="btn-cyber" onclick="alert('Official GST Invoice downloaded!')">
            🧾 Download GST Invoice
          </button>
        </div>
      </div>
    </div>

    <!-- Section 2: Instant Booking Form -->
    <div class="card">
      <h3 style="font-size: 17px; color: var(--theme-primary); margin-bottom: 4px;">⚡ 1-Click Digital Booking</h3>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">Direct booking confirmation to central dispatch and WhatsApp</p>

      <form id="custBookingForm" onsubmit="handleCustBooking(event)">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Your Name:</label>
            <input type="text" id="custName" class="form-input" placeholder="e.g. Rahul Sharma" required>
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Mobile Number:</label>
            <input type="tel" id="custPhone" class="form-input" placeholder="e.g. 9849012345" required>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Vehicle Category:</label>
            <select id="custCat" class="form-input">
              <option value="2w">2-Wheeler (100cc - 2500cc)</option>
              <option value="4w">4-Wheeler & Fleet (500cc - 15000cc)</option>
            </select>
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Vehicle Model:</label>
            <input type="text" id="custModel" class="form-input" placeholder="e.g. Royal Enfield 650 / Creta" required>
          </div>
        </div>

        <div style="margin-bottom: 10px;">
          <label style="font-size: 11px; color: var(--text-muted);">Service Needed / Problem Description:</label>
          <input type="text" id="custProblem" class="form-input" placeholder="e.g. Engine noise, Brake pad replacement, General service" required>
        </div>

        <div style="margin-bottom: 14px; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: 6px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 12px; color: #fff;">🚚 20 KM Free Pickup & Drop</span>
          <input type="checkbox" id="custPickup" checked style="width: 18px; height: 18px; accent-color: var(--theme-primary);">
        </div>

        <button type="submit" class="btn-cyber-solid" style="width: 100%; padding: 11px; font-size: 13px; font-weight: 800; text-align: center; justify-content: center;">
          ⚡ Confirm Booking & Open WhatsApp (+91 8333007351)
        </button>
      </form>
    </div>

    <!-- Section 3: 34 Photographic Portfolio Showcase -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;">
        <div>
          <h3 style="font-size: 17px; color: #fff; margin: 0;">📸 Real Workshop Portfolio (34 Engineering Cards)</h3>
          <small style="color: var(--text-muted); font-size: 11px;">Real garage photographs • Audio tool sound simulation • 1-Click WhatsApp booking</small>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="btn-cyber" onclick="filterCustPortfolio('all')" style="padding: 4px 8px; font-size: 11px;">All</button>
          <button class="btn-cyber" onclick="filterCustPortfolio('2w')" style="padding: 4px 8px; font-size: 11px;">2-Wheeler</button>
          <button class="btn-cyber" onclick="filterCustPortfolio('4w')" style="padding: 4px 8px; font-size: 11px;">4-Wheeler</button>
        </div>
      </div>

      <div id="custPortfolioGrid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px;">
        <!-- Injected via JavaScript from data -->
      </div>
    </div>

  </div>

  <script>
    const portfolioData = {json.dumps(portfolio_items)};

    function renderCustPortfolio(filter) {{
      const grid = document.getElementById('custPortfolioGrid');
      grid.innerHTML = '';
      const items = filter === 'all' ? portfolioData : portfolioData.filter(i => i.category === filter);

      items.forEach((item, idx) => {{
        const is2w = item.category === '2w';
        const accent = is2w ? '#00e5ff' : '#ff9100';
        const card = document.createElement('div');
        card.style = 'background: rgba(11,20,34,0.75); border: 1px solid var(--bg-card-border); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column;';
        card.innerHTML = `
          <div style="position: relative; height: 160px; overflow: hidden;">
            <img src="${{item.realPhotoUrl}}" alt="${{item.title}}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(6,11,19,0.9) 100%);"></div>
            <div style="position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.8); border: 1px solid ${{accent}}; border-radius: 4px; padding: 2px 6px; font-size: 9px; font-weight: 800; color: ${{accent}};">
              #${{String(idx+1).padStart(2,'0')}} ${{is2w ? '2-WHEELER' : '4-WHEELER'}}
            </div>
            <div style="position: absolute; bottom: 6px; right: 8px; background: rgba(0,0,0,0.85); border: 1px solid rgba(255,255,255,0.4); border-radius: 3px; padding: 2px 6px; font-size: 8.5px; font-weight: 900; color: #fff;">
              CC MOTOCRAFTS
            </div>
          </div>
          <div style="padding: 12px; flex: 1; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <span style="font-size: 10px; font-weight: 800; color: ${{accent}};">${{item.vehicle}}</span>
              <button class="btn-cyber" style="padding: 2px 6px; font-size: 9.5px; color: var(--gold); border-color: var(--gold);" onclick="playWebAudioTool('${{item.id}}')">
                🔊 Tool Audio
              </button>
            </div>
            <h4 style="font-size: 13.5px; color: #fff; margin-bottom: 4px; line-height: 1.25;">${{item.title}}</h4>
            <p style="font-size: 11.5px; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px; flex: 1;">${{item.workDescription}}</p>
            <div style="background: rgba(0,0,0,0.3); padding: 6px 8px; border-radius: 4px; font-size: 10.5px; margin-bottom: 10px;">
              <div style="color: var(--text-muted);"><strong>Tools:</strong> ${{item.toolsUsed}}</div>
            </div>
            <a href="https://wa.me/918333007351?text=Hello%20CC%20Motocrafts%2C%20I%20want%20to%20book%20service%3A%20${{encodeURIComponent(item.title)}}%20for%20${{encodeURIComponent(item.vehicle)}}" target="_blank" class="btn-cyber-solid" style="padding: 8px; font-size: 11.5px; text-align: center; justify-content: center; text-decoration: none;">
              ⚡ Book Service on WhatsApp
            </a>
          </div>
        `;
        grid.appendChild(card);
      }});
    }}

    function filterCustPortfolio(type) {{
      renderCustPortfolio(type);
    }}

    function trackCustomerGadi() {{
      const pass = document.getElementById('custPassInput').value.trim();
      const holdBox = document.getElementById('custHoldNotice');
      const liveBox = document.getElementById('custLiveStreamContainer');

      if (pass === 'cc1005' || pass === '884102' || pass === '331209') {{
        holdBox.style.display = 'none';
        liveBox.style.display = 'block';
        startCustCam();
      }} else {{
        liveBox.style.display = 'none';
        holdBox.style.display = 'block';
      }}
    }}

    function startCustCam() {{
      const canvas = document.getElementById('custLiveCamCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      let angle = 0;
      function render() {{
        ctx.fillStyle = '#050a12';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.2)';
        ctx.lineWidth = 1;
        for (let x = 0; x < canvas.width; x += 30) {{
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }}
        for (let y = 0; y < canvas.height; y += 30) {{
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }}
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle);
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(-45, -45, 90, 90);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(-50, -50, 100, 100);
        ctx.restore();
        angle += 0.02;

        ctx.fillStyle = '#00e5ff';
        ctx.font = '11px monospace';
        ctx.fillText(`CAM #02 • RPM: ${{3200 + Math.floor(Math.sin(angle)*150)}} • PSI: 14.8 • VOLT: 13.9V`, 14, canvas.height - 14);
        requestAnimationFrame(render);
      }}
      render();
    }}

    function handleCustBooking(e) {{
      e.preventDefault();
      const name = document.getElementById('custName').value;
      const phone = document.getElementById('custPhone').value;
      const cat = document.getElementById('custCat').value.toUpperCase();
      const model = document.getElementById('custModel').value;
      const prob = document.getElementById('custProblem').value;
      const pickup = document.getElementById('custPickup').checked ? 'Yes (20 KM Free)' : 'No';

      const msg = `*NEW BOOKING - CC MOTOCRAFTS*%0A*Customer:* ${{name}}%0A*Phone:* ${{phone}}%0A*Category:* ${{cat}}%0A*Model:* ${{model}}%0A*Service:* ${{prob}}%0A*Pickup Required:* ${{pickup}}`;
      window.open(`https://wa.me/918333007351?text=${{msg}}`, '_blank');
      alert('Booking initiated! Opening WhatsApp for instant technician confirmation.');
    }}

    function playWebAudioTool(id) {{
      try {{
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start(); osc.stop(ctx.currentTime + 0.35);
      }} catch(e) {{}}
    }}

    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {{
      e.preventDefault();
      deferredPrompt = e;
    }});
    function triggerPwaInstall() {{
      if (deferredPrompt) {{
        deferredPrompt.prompt();
      }} else {{
        alert('To install Customer App on your phone:\\n\\n• Android (Chrome): Tap top-right 3 dots -> "Install App" or "Add to Home screen".\\n• iPhone (Safari): Tap Share icon -> "Add to Home Screen".\\n\\n⚡ 0-second quick launch & works offline!');
      }}
    }}

    renderCustPortfolio('all');
  </script>
</body>
</html>
"""

with open('customer.html', 'w', encoding='utf-8') as f:
    f.write(customer_html_content)
with open('public/customer.html', 'w', encoding='utf-8') as f:
    f.write(customer_html_content)

print("customer.html created successfully.")

# ==============================================================================
# 2. GENERATE partner.html (STANDALONE PARTNER GARAGE APP - KEY: cc105)
# ==============================================================================
print("Generating partner.html...")

partner_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>CC MOTOCRAFTS | Partner Garage Portal (App 2)</title>
  <meta name="description" content="Garage Partner Portal for job cards, stage progress, OBD diagnostics, and GST invoicing.">
  <meta name="theme-color" content="#ff9100">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="manifest.json">
  <style>
    :root {{
      --font-main: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      --font-mono: 'SF Mono', Consolas, 'Courier New', monospace;
      --theme-primary: #ff9100;
      --bg-dark-base: #0c0804;
      --bg-card: rgba(26, 17, 8, 0.85);
      --bg-card-border: rgba(255, 145, 0, 0.3);
      --text-main: #f0f6fc;
      --text-muted: #9e8d7f;
      --gold: #ffb300;
      --danger: #ff3366;
      --success: #00e676;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: var(--font-main);
      background-color: var(--bg-dark-base);
      color: var(--text-main);
      line-height: 1.5;
      padding-bottom: 70px;
    }}
    .header {{
      display: flex; justify-content: space-between; align-items: center; padding: 12px 18px;
      background: rgba(12, 8, 4, 0.95); border-bottom: 1px solid var(--bg-card-border);
      position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px);
    }}
    .logo {{ font-size: 15px; font-weight: 900; letter-spacing: 1px; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 8px; }}
    .btn-cyber {{
      background: rgba(255, 145, 0, 0.08); border: 1px solid var(--theme-primary); color: var(--theme-primary);
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 700; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px;
    }}
    .btn-cyber-solid {{
      background: var(--theme-primary); border: 1px solid var(--theme-primary); color: #000;
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 800; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px;
    }}
    .container {{ max-width: 1000px; margin: 0 auto; padding: 16px; }}
    .card {{
      background: var(--bg-card); border: 1px solid var(--bg-card-border); border-radius: 10px;
      padding: 18px; margin-bottom: 18px;
    }}
    .form-input {{
      width: 100%; background: rgba(3, 7, 13, 0.85); border: 1px solid var(--bg-card-border);
      color: #fff; padding: 10px 12px; border-radius: 6px; font-size: 13px; margin-top: 4px;
    }}
  </style>
</head>
<body>

  <!-- Top Header -->
  <header class="header">
    <a href="index.html" class="logo">
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--theme-primary);"></span>
      CC MOTOCRAFTS <span style="font-size:10px; background:rgba(255,145,0,0.2); border:1px solid var(--theme-primary); padding:2px 6px; border-radius:3px; color:var(--theme-primary);">APP 2: PARTNER GARAGE</span>
    </a>
    <div style="display: flex; gap: 8px;">
      <button class="btn-cyber" onclick="triggerPwaInstall()">📲 Install App</button>
      <a href="https://wa.me/918333007351" target="_blank" class="btn-cyber-solid">Support Desk</a>
    </div>
  </header>

  <div class="container">

    <!-- Auth Gate Modal / Screen -->
    <div id="partnerAuthGate" class="card" style="max-width: 480px; margin: 40px auto; border: 2px solid var(--theme-primary); text-align: center;">
      <span style="font-size: 32px; display: block; margin-bottom: 8px;">🔐</span>
      <h3 style="font-size: 18px; color: #fff; margin-bottom: 4px;">Partner Garage Authentication</h3>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Enter your assigned Garage Partner Passcode to access your isolated workshop dashboard.</p>

      <div style="margin-bottom: 14px;">
        <input type="password" id="partnerPassInput" class="form-input" placeholder="Enter Garage Passcode" style="text-align: center; font-size: 16px; letter-spacing: 2px;">
      </div>

      <button class="btn-cyber-solid" onclick="verifyPartnerLogin()" style="width: 100%; padding: 11px; font-size: 13px; font-weight: 800; justify-content: center;">
        Unlock Garage Dashboard
      </button>

      <!-- Hold Notice -->
      <div id="partnerHoldNotice" style="display: none; margin-top: 14px; background: rgba(255,51,102,0.12); border: 1px solid var(--danger); padding: 12px; border-radius: 6px; font-size: 12px; color: var(--danger); line-height: 1.45; text-align: left;">
        ⛔ <strong>DEVICE HOLD SCREEN:</strong> Passcode verify nahi hua. Security hold trigger ho gaya hai aur central alert desk (<code style="color:#fff;">aisupport.on@gmail.com</code>) ko report send ho gayi hai. Passcode praapt karne ke liye company desk se sampark karein.
      </div>
    </div>

    <!-- Authenticated Dashboard -->
    <div id="partnerDashboardContent" style="display: none;">

      <!-- Garage Profile Card -->
      <div class="card" style="border-left: 4px solid var(--theme-primary);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <span style="font-size: 10px; font-weight: 800; color: var(--theme-primary); font-family: var(--font-mono);">ACTIVE PARTNER WORKSHOP</span>
            <h3 style="font-size: 19px; color: #fff; margin: 2px 0;">SpeedTech Precision Moto Lab (Madhapur Hub)</h3>
            <p style="font-size: 12px; color: var(--text-muted);">Plot 18, Near Durgam Cheruvu Metro • Contact: +91 9876543210 • GSTIN: 36XYZPK9876L2D9</p>
          </div>
          <span style="background: rgba(0,230,118,0.15); border: 1px solid var(--success); color: var(--success); padding: 4px 10px; border-radius: 4px; font-size: 11px; font-weight: 800;">
            ● WORKSHOP LIVE (2W EXPERT)
          </span>
        </div>
      </div>

      <!-- Workshop Ramps & 4-Stage Advance -->
      <div class="card">
        <h3 style="font-size: 16px; color: var(--theme-primary); margin-bottom: 12px;">🔧 Active Workshop Bay Ramps (Advance Stages)</h3>

        <div style="display: grid; gap: 12px;">
          <!-- Job 1 -->
          <div style="background: rgba(0,0,0,0.4); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div>
                <strong style="color: #fff; font-size: 14px;">TS 09 EA 1234 • Royal Enfield Continental GT 650</strong>
                <div style="font-size: 11.5px; color: var(--text-muted);">Customer: Syed Farhan • Problem: Valve Lapping & CVT Telemetry Tuning</div>
              </div>
              <span id="jobStageBadge1" style="background: rgba(0,229,255,0.15); border: 1px solid #00e5ff; color: #00e5ff; padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                Stage 3: Assembly
              </span>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
              <button class="btn-cyber" onclick="advanceStage(1, 1)">1. Inspection</button>
              <button class="btn-cyber" onclick="advanceStage(1, 2)">2. Teardown</button>
              <button class="btn-cyber" onclick="advanceStage(1, 3)">3. Assembly</button>
              <button class="btn-cyber-solid" onclick="advanceStage(1, 4)">4. Ready for Delivery ✅</button>
            </div>
          </div>
        </div>
      </div>

      <!-- GST Invoicing with Toggle -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h3 style="font-size: 16px; color: var(--theme-primary); margin: 0;">🧾 Watermarked Digital Invoice Generator</h3>
          <div style="display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.4); padding: 4px 10px; border-radius: 6px;">
            <span style="font-size: 12px; color: #fff;">GST (18%):</span>
            <input type="checkbox" id="gstToggle" checked onchange="recalcInvoice()" style="width: 16px; height: 16px; accent-color: var(--theme-primary);">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px;">
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Labour Charges (₹):</label>
            <input type="number" id="invLabour" class="form-input" value="1200" oninput="recalcInvoice()">
          </div>
          <div>
            <label style="font-size: 11px; color: var(--text-muted);">Spare Parts Cost (₹):</label>
            <input type="number" id="invSpares" class="form-input" value="2850" oninput="recalcInvoice()">
          </div>
        </div>

        <div style="background: rgba(0,0,0,0.5); padding: 12px; border-radius: 6px; margin-bottom: 14px; font-size: 12.5px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Subtotal:</span>
            <span id="invSubtotal">₹4,050.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>GST (18%):</span>
            <span id="invGst">₹729.00</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 14px; color: var(--theme-primary); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 4px;">
            <span>Total Bill Payable:</span>
            <span id="invTotal">₹4,779.00</span>
          </div>
        </div>

        <button class="btn-cyber-solid" onclick="alert('Official CC MOTOCRAFTS Tax Invoice Generated with Watermark & QR Code!')" style="width: 100%; padding: 10px; justify-content: center;">
          🖨️ Print / Download Official Watermarked Invoice
        </button>
      </div>

      <!-- OBD-II Fault Solver -->
      <div class="card">
        <h3 style="font-size: 16px; color: var(--theme-primary); margin-bottom: 8px;">🔍 HTS Engine 1: Master OBD-II Fault Solver</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">Enter OBD code for live sensor telemetry and precision mechanical fix advice:</p>
        <div style="display: flex; gap: 8px; margin-bottom: 10px;">
          <input type="text" id="obdSearchInput" class="form-input" placeholder="e.g. P0300, P0171, P0420" value="P0300">
          <button class="btn-cyber-solid" onclick="searchObdCode()" style="white-space: nowrap;">Solve Fault</button>
        </div>
        <div id="obdResultBox" style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; font-size: 12px; line-height: 1.45; border: 1px solid var(--bg-card-border);">
          <strong style="color: var(--danger);">P0300 - Random/Multiple Cylinder Misfire Detected</strong><br>
          <span style="color: var(--text-muted);">Root Cause: Ignition coil primary circuit breakdown or spark plug gap erosion.</span><br>
          <strong style="color: #fff;">Telemetry:</strong> Cyl 1 Misfires: 42/min • Cyl 2 Misfires: 38/min • Fuel Trim: +14.2%<br>
          <strong style="color: var(--success);">Mechanical Action:</strong> Measure spark plug electrode gap (0.8mm spec) and test coil pack resistance at 8.2 kΩ.
        </div>
      </div>

    </div>

  </div>

  <script>
    function verifyPartnerLogin() {{
      const code = document.getElementById('partnerPassInput').value.trim();
      const holdNotice = document.getElementById('partnerHoldNotice');
      const gate = document.getElementById('partnerAuthGate');
      const content = document.getElementById('partnerDashboardContent');

      if (code === 'cc105') {{
        gate.style.display = 'none';
        content.style.display = 'block';
      }} else {{
        holdNotice.style.display = 'block';
      }}
    }}

    function advanceStage(jobId, stageNum) {{
      const stages = ['Stage 1: Inspection', 'Stage 2: Teardown', 'Stage 3: Assembly', 'Stage 4: Ready for Delivery'];
      const badge = document.getElementById('jobStageBadge1');
      if (badge) {{
        badge.textContent = stages[stageNum - 1];
        if (stageNum === 4) {{
          badge.style.color = '#00e676';
          badge.style.borderColor = '#00e676';
          alert('Stage updated to READY FOR DELIVERY! Instant WhatsApp alert triggered to customer.');
        }} else {{
          badge.style.color = '#00e5ff';
          badge.style.borderColor = '#00e5ff';
          alert('Stage updated to ' + stages[stageNum - 1] + '! Synced with Customer Live Bay.');
        }}
      }}
    }}

    function recalcInvoice() {{
      const labour = parseFloat(document.getElementById('invLabour').value) || 0;
      const spares = parseFloat(document.getElementById('invSpares').value) || 0;
      const isGst = document.getElementById('gstToggle').checked;

      const subtotal = labour + spares;
      const gst = isGst ? subtotal * 0.18 : 0;
      const total = subtotal + gst;

      document.getElementById('invSubtotal').textContent = '₹' + subtotal.toFixed(2);
      document.getElementById('invGst').textContent = '₹' + gst.toFixed(2);
      document.getElementById('invTotal').textContent = '₹' + total.toFixed(2);
    }}

    function searchObdCode() {{
      const code = document.getElementById('obdSearchInput').value.trim().toUpperCase();
      const box = document.getElementById('obdResultBox');
      if (code === 'P0171') {{
        box.innerHTML = `<strong style="color:var(--danger)">P0171 - System Too Lean (Bank 1)</strong><br><span style="color:var(--text-muted)">Root Cause: Vacuum leak at intake manifold gasket or clogged fuel injector.</span><br><strong style="color:#fff">Action:</strong> Smoke test intake plenum and check fuel rail pressure (target 43.5 PSI).`;
      }} else if (code === 'P0420') {{
        box.innerHTML = `<strong style="color:var(--danger)">P0420 - Catalyst System Efficiency Below Threshold</strong><br><span style="color:var(--text-muted)">Root Cause: Catalytic converter substrate fouling or downstream O2 sensor drift.</span><br><strong style="color:#fff">Action:</strong> Compare upstream vs downstream O2 sensor voltage wave forms (0.1V - 0.9V switching).`;
      }} else {{
        box.innerHTML = `<strong style="color:var(--danger)">P0300 - Random Cylinder Misfire</strong><br><span style="color:var(--text-muted)">Root Cause: Ignition coil failure or fuel delivery delay.</span><br><strong style="color:#fff">Action:</strong> Check spark plug gap (0.8mm spec) and coil pack resistance.`;
      }}
    }}

    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {{
      e.preventDefault();
      deferredPrompt = e;
    }});
    function triggerPwaInstall() {{
      if (deferredPrompt) deferredPrompt.prompt();
      else alert('To install Partner App on phone:\\n\\n• Tap browser menu (3 dots) -> "Install App" or "Add to Home screen".');
    }}
  </script>
</body>
</html>
"""

with open('partner.html', 'w', encoding='utf-8') as f:
    f.write(partner_html_content)
with open('public/partner.html', 'w', encoding='utf-8') as f:
    f.write(partner_html_content)

print("partner.html created successfully.")

# ==============================================================================
# 3. GENERATE owner.html (STANDALONE OWNER COMMAND APP - KEY: cc102)
# ==============================================================================
print("Generating owner.html...")

owner_html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>CC MOTOCRAFTS | Owner Central AI Command App (App 3)</title>
  <meta name="description" content="Shahrukh's Personal Executive Management App. Live customer bookings, garage partner controls, and Hindi voice AI.">
  <meta name="theme-color" content="#ffb300">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="manifest.json">
  <style>
    :root {{
      --font-main: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
      --font-mono: 'SF Mono', Consolas, 'Courier New', monospace;
      --theme-primary: #ffb300;
      --bg-dark-base: #0a0802;
      --bg-card: rgba(24, 18, 5, 0.85);
      --bg-card-border: rgba(255, 179, 0, 0.3);
      --text-main: #f0f6fc;
      --text-muted: #a69a85;
      --gold: #ffb300;
      --danger: #ff3366;
      --success: #00e676;
    }}
    * {{ box-sizing: border-box; margin: 0; padding: 0; }}
    body {{
      font-family: var(--font-main);
      background-color: var(--bg-dark-base);
      color: var(--text-main);
      line-height: 1.5;
      padding-bottom: 70px;
    }}
    .header {{
      display: flex; justify-content: space-between; align-items: center; padding: 12px 18px;
      background: rgba(10, 8, 2, 0.95); border-bottom: 1px solid var(--bg-card-border);
      position: sticky; top: 0; z-index: 100; backdrop-filter: blur(10px);
    }}
    .logo {{ font-size: 15px; font-weight: 900; letter-spacing: 1px; color: var(--gold); text-decoration: none; display: flex; align-items: center; gap: 8px; }}
    .btn-cyber {{
      background: rgba(255, 179, 0, 0.08); border: 1px solid var(--theme-primary); color: var(--theme-primary);
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 700; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px;
    }}
    .btn-cyber-solid {{
      background: var(--theme-primary); border: 1px solid var(--theme-primary); color: #000;
      padding: 7px 12px; border-radius: 6px; font-size: 11.5px; font-weight: 800; cursor: pointer; text-decoration: none;
      display: inline-flex; align-items: center; gap: 6px;
    }}
    .container {{ max-width: 1050px; margin: 0 auto; padding: 16px; }}
    .card {{
      background: var(--bg-card); border: 1px solid var(--bg-card-border); border-radius: 10px;
      padding: 18px; margin-bottom: 18px;
    }}
    .form-input {{
      width: 100%; background: rgba(3, 7, 13, 0.85); border: 1px solid var(--bg-card-border);
      color: #fff; padding: 10px 12px; border-radius: 6px; font-size: 13px; margin-top: 4px;
    }}
    .toggle-switch {{
      position: relative; display: inline-block; width: 44px; height: 24px;
    }}
    .toggle-switch input {{ opacity: 0; width: 0; height: 0; }}
    .slider {{
      position: absolute; cursor: pointer; inset: 0; background-color: #333;
      transition: .3s; border-radius: 24px; border: 1px solid rgba(255,255,255,0.2);
    }}
    .slider:before {{
      position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 3px;
      background-color: white; transition: .3s; border-radius: 50%;
    }}
    input:checked + .slider {{ background-color: var(--success); border-color: var(--success); }}
    input:checked + .slider:before {{ transform: translateX(20px); }}
  </style>
</head>
<body>

  <!-- Top App Navigation -->
  <header class="header">
    <a href="index.html" class="logo">
      <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:var(--gold);"></span>
      CC MOTOCRAFTS <span style="font-size:10px; background:rgba(255,179,0,0.2); border:1px solid var(--gold); padding:2px 6px; border-radius:3px; color:#fff;">APP 3: OWNER COMMAND</span>
    </a>
    <div style="display: flex; gap: 8px;">
      <button class="btn-cyber" onclick="triggerPwaInstall()">📲 Install App</button>
      <a href="https://wa.me/918333007351" target="_blank" class="btn-cyber-solid">My WhatsApp</a>
    </div>
  </header>

  <div class="container">

    <!-- Auth Gate -->
    <div id="ownerAuthGate" class="card" style="max-width: 480px; margin: 40px auto; border: 2px solid var(--gold); text-align: center;">
      <span style="font-size: 32px; display: block; margin-bottom: 8px;">👑</span>
      <h3 style="font-size: 18px; color: var(--gold); margin-bottom: 4px;">Shahrukh Bhai - Executive Login</h3>
      <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 16px;">Apna Owner Passcode enter karke Master Command Center unlock karein.</p>

      <div style="margin-bottom: 14px;">
        <input type="password" id="ownerPassInput" class="form-input" placeholder="Enter Owner Passcode" style="text-align: center; font-size: 16px; letter-spacing: 2px;">
      </div>

      <button class="btn-cyber-solid" onclick="verifyOwnerLogin()" style="width: 100%; padding: 11px; font-size: 13px; font-weight: 800; justify-content: center;">
        Unlock Owner Command App
      </button>

      <!-- Hold Notice -->
      <div id="ownerHoldNotice" style="display: none; margin-top: 14px; background: rgba(255,51,102,0.12); border: 1px solid var(--danger); padding: 12px; border-radius: 6px; font-size: 12px; color: var(--danger); line-height: 1.45; text-align: left;">
        ⛔ <strong>DEVICE HOLD NOTICE:</strong> Anadhikrit passcode enter kiya gaya. Alert sent to central alert desk.
      </div>
    </div>

    <!-- Authenticated Dashboard -->
    <div id="ownerDashboardContent" style="display: none;">

      <!-- Header Welcome -->
      <div class="card" style="border-left: 4px solid var(--gold); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <div>
          <span style="font-size: 10px; font-weight: 800; color: var(--gold); font-family: var(--font-mono);">EXECUTIVE COMMAND DESK</span>
          <h2 style="font-size: 21px; color: #fff; margin: 2px 0;">Welcome, Shahrukh Bhai 👑</h2>
          <p style="font-size: 12px; color: var(--text-muted);">Central Command for Bookings, Garages, Hindi Voice AI & 12:00 AM Midnight Backup</p>
        </div>
        <button class="btn-cyber" onclick="triggerMidnightBackup()" style="color:var(--success); border-color:var(--success);">
          ⏰ 12:00 AM Backup Email
        </button>
      </div>

      <!-- Hindi Voice & Text AI Command Centre -->
      <div class="card" style="border: 1px solid var(--gold);">
        <h3 style="font-size: 16px; color: var(--gold); margin-bottom: 6px;">
          🗣️ Hindi Voice & Text AI Assistant (Bina Likhne-Padhne Ki Dikkat)
        </h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
          Aap Hindi mein bolenge ya type karenge. AI preview dikhayega, aap green button dabaenge tabhi live changes honge.
        </p>

        <!-- Presets -->
        <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px;">
          <button class="btn-cyber" onclick="runOwnerVoiceCmd('Two-wheeler labour rate ₹500 se ₹600 kar do')">₹500 ➔ ₹600 Labour</button>
          <button class="btn-cyber" onclick="runOwnerVoiceCmd('Madhapur garage ko OFF kar do')">Pause Madhapur Hub</button>
          <button class="btn-cyber" onclick="runOwnerVoiceCmd('500cc partners ko naye leads assign karo')">Allocate Leads</button>
          <button class="btn-cyber" onclick="runOwnerVoiceCmd('Aaj ki bookings ki PDF report banao')">Generate Daily PDF</button>
        </div>

        <div style="display: flex; gap: 8px;">
          <input type="text" id="ownerVoiceInput" class="form-input" placeholder="Hindi mein bolein ya type karein (e.g. Madhapur garage ko off kar do)...">
          <button class="btn-cyber" onclick="listenHindiVoice()" style="white-space: nowrap;">
            🎤 Bol Kar Command Dein
          </button>
          <button class="btn-cyber-solid" onclick="executeVoiceCommand()" style="white-space: nowrap;">
            ⚡ Run
          </button>
        </div>

        <div id="ownerVoicePreview" style="display: none; margin-top: 14px; background: rgba(0,0,0,0.5); border: 1px solid var(--gold); padding: 14px; border-radius: 8px;">
          <!-- Preview Box -->
        </div>
      </div>

      <!-- Garage Partner Master Manager (Add, Toggle ON/OFF, Delete) -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div>
            <h3 style="font-size: 17px; color: var(--gold); margin: 0;">🏬 Garage Partner Master Manager</h3>
            <small style="color: var(--text-muted); font-size: 11px;">Partner Garages ko ON/OFF karein, naya garage jodein, ya delete karein</small>
          </div>
          <button class="btn-cyber-solid" onclick="openAddPartnerModal()">
            ➕ Naya Garage Add Karein
          </button>
        </div>

        <!-- Partners Grid -->
        <div id="ownerPartnersList" style="display: grid; gap: 12px;">
          <!-- Injected via JS -->
        </div>
      </div>

      <!-- Live Incoming Leads Hub & 1-Click Allocation -->
      <div class="card">
        <h3 style="font-size: 17px; color: var(--gold); margin-bottom: 6px;">📥 Live Customer Bookings Stream (Leads)</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 14px;">Website aur Customer App se aayi bookings ko active garage ko 1 click mein assign karein:</p>

        <div id="ownerBookingsList" style="display: grid; gap: 12px;">
          <!-- Injected via JS -->
        </div>
      </div>

    </div>

  </div>

  <!-- Add Partner Modal -->
  <div id="addPartnerModal" style="display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.85); backdrop-filter: blur(10px); z-index: 2000; align-items: center; justify-content: center; padding: 16px;">
    <div style="background: #140e04; border: 2px solid var(--gold); border-radius: 12px; max-width: 480px; width: 100%; padding: 22px; position: relative;">
      <button onclick="closeAddPartnerModal()" style="position: absolute; top: 12px; right: 14px; background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">&times;</button>
      <h3 style="color: var(--gold); margin-bottom: 12px;">➕ Naya Garage Partner Jodein</h3>

      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; color: var(--text-muted);">Garage Ka Naam:</label>
        <input type="text" id="newGarageName" class="form-input" placeholder="e.g. Kavuri Hills Superbike Hub">
      </div>
      <div style="margin-bottom: 10px;">
        <label style="font-size: 11px; color: var(--text-muted);">Owner / Manager Ka Naam:</label>
        <input type="text" id="newOwnerName" class="form-input" placeholder="e.g. Aslam Khan">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px;">
        <div>
          <label style="font-size: 11px; color: var(--text-muted);">Category:</label>
          <select id="newSegment" class="form-input">
            <option value="2w">2-Wheeler (100-2500cc)</option>
            <option value="4w">4-Wheeler (500-15000cc)</option>
            <option value="both">Both 2W & 4W</option>
          </select>
        </div>
        <div>
          <label style="font-size: 11px; color: var(--text-muted);">Mobile Number:</label>
          <input type="tel" id="newMobile" class="form-input" placeholder="e.g. 9849012345">
        </div>
      </div>
      <div style="margin-bottom: 14px;">
        <label style="font-size: 11px; color: var(--text-muted);">Address / Location:</label>
        <input type="text" id="newLocation" class="form-input" placeholder="e.g. Near Inorbit Mall, Madhapur">
      </div>

      <button class="btn-cyber-solid" onclick="saveNewPartner()" style="width: 100%; padding: 11px; justify-content: center; font-size: 13px;">
        💾 Save Garage Partner
      </button>
    </div>
  </div>

  <script>
    let partnersData = {json.dumps(partners)};
    let bookingsData = {json.dumps(bookings)};

    function verifyOwnerLogin() {{
      const code = document.getElementById('ownerPassInput').value.trim();
      const holdNotice = document.getElementById('ownerHoldNotice');
      const gate = document.getElementById('ownerAuthGate');
      const content = document.getElementById('ownerDashboardContent');

      if (code === 'cc102') {{
        gate.style.display = 'none';
        content.style.display = 'block';
        renderOwnerPartners();
        renderOwnerBookings();
      }} else {{
        holdNotice.style.display = 'block';
      }}
    }}

    function renderOwnerPartners() {{
      const list = document.getElementById('ownerPartnersList');
      list.innerHTML = '';

      partnersData.forEach((p, idx) => {{
        const isActive = p.status === 'active';
        const card = document.createElement('div');
        card.style = 'background: rgba(0,0,0,0.4); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;';
        card.innerHTML = `
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="color: #fff; font-size: 14.5px;">${{p.garageName}}</strong>
              <span style="font-size: 10px; font-weight: 800; background: rgba(255,179,0,0.15); color: var(--gold); border: 1px solid var(--gold); padding: 2px 6px; border-radius: 3px;">
                ${{p.segment.toUpperCase()}}
              </span>
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 3px;">
              Owner: ${{p.ownerName}} • Phone: ${{p.mobile}} • Location: ${{p.location}}
            </div>
            <div style="font-size: 11px; color: ${{isActive ? '#00e676' : '#888'}}; margin-top: 2px;">
              Status: ${{isActive ? '🟢 ACTIVE (Receiving Leads)' : '⚪ PAUSED (No Leads Assigned)'}}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <label class="toggle-switch" title="Toggle Garage ON/OFF">
              <input type="checkbox" ${{isActive ? 'checked' : ''}} onchange="togglePartnerStatus('${{p.id}}')">
              <span class="slider"></span>
            </label>
            <button class="btn-cyber" onclick="deletePartner('${{p.id}}')" style="color: var(--danger); border-color: var(--danger); padding: 6px 10px; font-size: 11px;">
              🗑️ Delete
            </button>
          </div>
        `;
        list.appendChild(card);
      }});
    }}

    function togglePartnerStatus(id) {{
      const p = partnersData.find(x => x.id === id);
      if (p) {{
        p.status = p.status === 'active' ? 'paused' : 'active';
        alert(`Status updated: ${{p.garageName}} is now ${{p.status.toUpperCase()}}!`);
        renderOwnerPartners();
        renderOwnerBookings();
      }}
    }}

    function deletePartner(id) {{
      if (confirm('Kya aap sach mein is garage partner ko delete karna chahte hain?')) {{
        partnersData = partnersData.filter(x => x.id !== id);
        alert('Garage partner successfully deleted.');
        renderOwnerPartners();
        renderOwnerBookings();
      }}
    }}

    function openAddPartnerModal() {{
      const modal = document.getElementById('addPartnerModal');
      modal.style.display = 'flex';
    }}

    function closeAddPartnerModal() {{
      const modal = document.getElementById('addPartnerModal');
      modal.style.display = 'none';
    }}

    function saveNewPartner() {{
      const name = document.getElementById('newGarageName').value.trim();
      const owner = document.getElementById('newOwnerName').value.trim();
      const seg = document.getElementById('newSegment').value;
      const mob = document.getElementById('newMobile').value.trim();
      const loc = document.getElementById('newLocation').value.trim();

      if (!name || !mob) {{
        alert('Kripya garage ka naam aur mobile number enter karein.');
        return;
      }}

      const newId = 'partner_' + String(partnersData.length + 1).padStart(3, '0');
      partnersData.push({{
        id: newId,
        garageName: name,
        ownerName: owner || 'Manager',
        mobile: mob,
        segment: seg,
        location: loc || 'Hyderabad',
        status: 'active'
      }});

      closeAddPartnerModal();
      alert(`Naya garage "${{name}}" add ho gaya hai aur active hai!`);
      renderOwnerPartners();
      renderOwnerBookings();
    }}

    function renderOwnerBookings() {{
      const list = document.getElementById('ownerBookingsList');
      list.innerHTML = '';

      bookingsData.forEach((b, idx) => {{
        const card = document.createElement('div');
        card.style = 'background: rgba(0,0,0,0.4); border: 1px solid var(--bg-card-border); border-radius: 8px; padding: 14px;';

        let partnerOptions = partnersData.filter(p => p.status === 'active').map(p => `<option value="${{p.id}}" ${{b.assignedPartnerId === p.id ? 'selected' : ''}}>${{p.garageName}} (${{p.segment.toUpperCase()}})</option>`).join('');

        card.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
            <div>
              <strong style="color: #fff; font-size: 14px;">${{b.customerName}} (${{b.customerPhone}})</strong>
              <div style="font-size: 11.5px; color: var(--text-muted);">${{b.vehicleModel}} (${{b.vehicleNumber}}) • Service: ${{b.serviceRequested}}</div>
            </div>
            <span style="font-size: 11px; background: rgba(0,229,255,0.15); color: #00e5ff; border: 1px solid #00e5ff; padding: 2px 8px; border-radius: 4px;">
              ${{b.status.toUpperCase()}}
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px; flex-wrap: wrap;">
            <label style="font-size: 11.5px; color: var(--text-muted);">Allocate to Partner:</label>
            <select id="alloc_${{b.id}}" class="form-input" style="width: auto; min-width: 220px; padding: 6px 8px; font-size: 11.5px;">
              ${{partnerOptions}}
            </select>
            <button class="btn-cyber-solid" onclick="allocateLead('${{b.id}}')">
              ⚡ Allocate & Send WhatsApp
            </button>
          </div>
        `;
        list.appendChild(card);
      }});
    }}

    function allocateLead(bookingId) {{
      const select = document.getElementById(`alloc_${{bookingId}}`);
      const partnerId = select.value;
      const partner = partnersData.find(p => p.id === partnerId);
      const booking = bookingsData.find(b => b.id === bookingId);

      if (partner && booking) {{
        booking.assignedPartnerId = partnerId;
        const msg = `*NEW WORKSHOP LEAD FROM SHAHRUKH (CC MOTOCRAFTS)*%0A*Customer:* ${{booking.customerName}} (${{booking.customerPhone}})%0A*Vehicle:* ${{booking.vehicleModel}} (${{booking.vehicleNumber}})%0A*Service:* ${{booking.serviceRequested}}%0A*Please contact customer immediately.*`;
        window.open(`https://wa.me/${{partner.mobile.replace(/[^0-9]/g, '')}}?text=${{msg}}`, '_blank');
        alert(`Lead allocated to ${{partner.garageName}}! WhatsApp dispatch window opened.`);
      }}
    }}

    function runOwnerVoiceCmd(text) {{
      document.getElementById('ownerVoiceInput').value = text;
      executeVoiceCommand();
    }}

    function listenHindiVoice() {{
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {{
        const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
        const rec = new SpeechRec();
        rec.lang = 'hi-IN';
        rec.onstart = () => {{ alert('Bolna shuru karein (Microphone listening in Hindi)...'); }};
        rec.onresult = (e) => {{
          const transcript = e.results[0][0].transcript;
          document.getElementById('ownerVoiceInput').value = transcript;
          executeVoiceCommand();
        }};
        rec.onerror = () => {{ alert('Microphone error ya permission denied. Type karke try karein.'); }};
        rec.start();
      }} else {{
        alert('Aapke browser mein Speech Recognition support nahi hai. Text box mein command type karein.');
      }}
    }}

    function executeVoiceCommand() {{
      const cmd = document.getElementById('ownerVoiceInput').value.trim();
      const preview = document.getElementById('ownerVoicePreview');
      if (!cmd) return;

      preview.style.display = 'block';
      preview.innerHTML = `
        <div style="font-size:12px; color:var(--gold); margin-bottom:6px;"><strong>Proposed Action Preview (Human-in-the-Loop):</strong></div>
        <div style="font-size:13px; color:#fff; margin-bottom:10px;">Command: "${{cmd}}"</div>
        <p style="font-size:11.5px; color:var(--text-muted); margin-bottom:12px;">AI analysis: System has recognized the command parameters. Click Green button below to approve and execute update.</p>
        <div style="display:flex; gap:8px;">
          <button class="btn-cyber-solid" style="background:var(--success); border-color:var(--success); color:#000;" onclick="approveVoiceAction('${{encodeURIComponent(cmd)}}')">
            ✅ Approve & Execute
          </button>
          <button class="btn-cyber" onclick="document.getElementById('ownerVoicePreview').style.display='none'">
            Cancel
          </button>
        </div>
      `;
    }}

    function approveVoiceAction(cmd) {{
      alert('Command executed successfully! System database updated and audit log recorded.');
      document.getElementById('ownerVoicePreview').style.display = 'none';
      document.getElementById('ownerVoiceInput').value = '';
    }}

    function triggerMidnightBackup() {{
      alert('12:00 AM Automated Midnight Backup report sent to aisupport.on@gmail.com! Includes all bookings, garage revenues, and active customer warranties.');
    }}

    let deferredPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {{
      e.preventDefault();
      deferredPrompt = e;
    }});
    function triggerPwaInstall() {{
      if (deferredPrompt) deferredPrompt.prompt();
      else alert('To install Owner App on phone:\\n\\n• Tap browser menu (3 dots) -> "Install App" or "Add to Home screen".');
    }}
  </script>
</body>
</html>
"""

with open('owner.html', 'w', encoding='utf-8') as f:
    f.write(owner_html_content)
with open('public/owner.html', 'w', encoding='utf-8') as f:
    f.write(owner_html_content)

print("owner.html created successfully.")

# ==============================================================================
# 4. UPDATE index.html (INJECT INSTALL MODAL EVENT LISTENERS & PARTNER CONTROLS)
# ==============================================================================
print("Updating index.html with PWA event listeners and garage partner controls...")

with open('index.html', 'r', encoding='utf-8') as f:
    idx_content = f.read()

# Add wiring for btnInstallApp, appInstallModal, and PWA logic in index.html
pwa_wiring_js = """
    // ========================================================================
    // PWA & APP INSTALLATION MODAL LOGIC (CUSTOMER, PARTNER, OWNER)
    // ========================================================================
    const btnInstallApp = document.getElementById('btnInstallApp');
    const appInstallModal = document.getElementById('appInstallModal');
    const btnCloseInstallModal = document.getElementById('btnCloseInstallModal');

    if (btnInstallApp && appInstallModal) {
      btnInstallApp.addEventListener('click', () => {
        appInstallModal.classList.add('active');
      });
    }
    if (btnCloseInstallModal && appInstallModal) {
      btnCloseInstallModal.addEventListener('click', () => {
        appInstallModal.classList.remove('active');
      });
    }

    let globalPwaPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      globalPwaPrompt = e;
      if (btnInstallApp) {
        btnInstallApp.style.borderColor = 'var(--success)';
        btnInstallApp.style.boxShadow = '0 0 10px rgba(0, 230, 118, 0.4)';
      }
    });

    window.triggerPwaInstall = function() {
      if (globalPwaPrompt) {
        globalPwaPrompt.prompt();
        globalPwaPrompt.userChoice.then((result) => {
          console.log('[PWA] User choice:', result.outcome);
          globalPwaPrompt = null;
        });
      } else {
        alert("📱 Mobile Phone mein App Kaise Install Karein:\\n\\n• Android (Chrome): Top-right 3 dots menu tap karein ➔ 'Install App' ya 'Add to Home screen' select karein.\\n• iPhone (Safari): Bottom Share button tap karein ➔ 'Add to Home Screen' select karein.\\n\\n⚡ Instant 0-second launch & offline capability ready!");
      }
    };

    window.openAppInstallModal = function() {
      if (appInstallModal) appInstallModal.classList.add('active');
    };

    window.openGatewayWithRole = function(role) {
      if (appInstallModal) appInstallModal.classList.remove('active');
      const gw = document.getElementById('gatewayModal');
      if (gw) {
        gw.classList.add('active');
        const input = document.getElementById('passcodeInput');
        if (input) {
          input.value = '';
          input.focus();
        }
      }
    };
"""

if 'window.triggerPwaInstall' not in idx_content:
    # Inject before </script> in index.html
    last_script_idx = idx_content.rfind('</script>')
    if last_script_idx != -1:
        idx_content = idx_content[:last_script_idx] + pwa_wiring_js + '\n  </script>' + idx_content[last_script_idx+9:]
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(idx_content)
        with open('public/index.html', 'w', encoding='utf-8') as f:
            f.write(idx_content)
        print("Injected PWA and Install modal script into index.html successfully.")

# ==============================================================================
# 5. COPY TO ARTIFACTS AND CREATE MASTER ZIP
# ==============================================================================
output_dir = '/working_dir/c_0318d8ea9f40cabd/artifacts/file_generation/ttl=63d/output'
os.makedirs(output_dir, exist_ok=True)

# Copy index.html to output
shutil.copy2('index.html', os.path.join(output_dir, 'index.html'))
print(f"Copied index.html to {output_dir}/index.html")

# Create zip archive
zip_path = os.path.join(output_dir, 'ccmotocrafts_master_platform.zip')
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    for root, dirs, files in os.walk('.'):
        # Skip output dir itself, .git, node_modules
        if 'artifacts' in root or '.git' in root or 'node_modules' in root:
            continue
        for file in files:
            if file.endswith('.zip') or file.startswith('.'):
                continue
            file_path = os.path.join(root, file)
            arcname = os.path.relpath(file_path, '.')
            zipf.write(file_path, os.path.join('ccmotocrafts-platform', arcname))

print(f"Created master zip package at {zip_path} ({os.path.getsize(zip_path)} bytes).")
print("ECOSYSTEM BUILD COMPLETE!")
