/**
 * CC MOTOCRAFTS ENTERPRISE PLATFORM - MAIN CORE APPLICATION
 * Mode Switcher (2W ⇄ 4W), 3D Engine Canvas HUD, Security Gateways, and Modal Controllers
 */

document.addEventListener('DOMContentLoaded', () => {
  const state = { currentMode: '2w', config: null };
  const body = document.body;
  const brandSub = document.querySelector('.brand-sub');
  const heroBadge = document.querySelector('.hero-badge-text');
  const heroTitle = document.getElementById('heroTitle');
  const heroDescription = document.getElementById('heroDescription');
  const heroStat1Val = document.getElementById('heroStat1Val');
  const heroStat1Lbl = document.getElementById('heroStat1Lbl');
  const btnMode2w = document.getElementById('btnMode2w');
  const btnMode4w = document.getElementById('btnMode4w');
  const whatsappBookingBtn = document.getElementById('whatsappBookingBtn');
  
  // Gateway Modal
  const gatewayModal = document.getElementById('gatewayModal');
  const openGatewayBtn = document.getElementById('openGatewayBtn');
  const closeGatewayBtn = document.getElementById('closeGatewayBtn');
  const btnVerifyPasscode = document.getElementById('btnVerifyPasscode');
  const passcodeInput = document.getElementById('passcodeInput');
  const holdScreenBox = document.getElementById('holdScreenBox');
  const holdNoticeText = document.getElementById('holdNoticeText');

  (window.ccFetch || fetch)('/api/config')
    .then(res => res.json())
    .then(data => { state.config = data; updateModeUI(); })
    .catch(err => console.error(err));

  btnMode2w.addEventListener('click', () => switchMode('2w'));
  btnMode4w.addEventListener('click', () => switchMode('4w'));

  function switchMode(newMode) {
    if (state.currentMode === newMode) return;
    state.currentMode = newMode;
    if (newMode === '4w') {
      body.classList.add('mode-4w');
      btnMode4w.classList.add('active');
      btnMode2w.classList.remove('active');
    } else {
      body.classList.remove('mode-4w');
      btnMode2w.classList.add('active');
      btnMode4w.classList.remove('active');
    }
    updateModeUI();
  }

  function updateModeUI() {
    const is4w = state.currentMode === '4w';
    if (is4w) {
      brandSub.textContent = 'CarS CareS Motocrafts AI Engine Labs';
      heroBadge.textContent = 'CarS CareS Commercial & High-Capacity Hub';
      heroTitle.innerHTML = 'CarS CareS Motocrafts<br><span style="color: var(--theme-primary);">AI Engine Labs Service</span>';
      heroDescription.textContent = '500cc to 15,000cc high-capacity precision engineering for Sedans, SUVs, Commercial Fleets, and Heavy Diesels. Powered by 25-Year Master Diagnostic AI with Live Work Bay Streaming.';
      heroStat1Val.textContent = '500cc - 15,000cc';
      heroStat1Lbl.textContent = 'Cars & Fleet Coverage';
      whatsappBookingBtn.href = 'https://wa.me/918333007351?text=Hello%20CC%20Motocrafts%20Team!%20I%20want%20to%20book%20a%204-Wheeler%20Car%20Service.';
      document.querySelectorAll('.pricing-2w').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.pricing-4w').forEach(el => el.style.display = 'flex');
    } else {
      brandSub.textContent = 'CC Motocrafts AI Engine Labs';
      heroBadge.textContent = 'Precision 2-Wheeler AI Diagnostic Hub';
      heroTitle.innerHTML = 'CC Motocrafts<br><span style="color: var(--theme-primary);">AI Engine Labs Service</span>';
      heroDescription.textContent = '100cc to 2,500cc specialist motorcycle and scooter engineering. Precision CVT tuning, superbike valve clearance, and deep ECU diagnostic telemetry with real-time video bay tracking.';
      heroStat1Val.textContent = '100cc - 2,500cc';
      heroStat1Lbl.textContent = 'Motorcycle & Scooter';
      whatsappBookingBtn.href = 'https://wa.me/918333007351?text=Hello%20CC%20Motocrafts%20Team!%20I%20want%20to%20book%20a%202-Wheeler%20Bike%20Service.';
      document.querySelectorAll('.pricing-2w').forEach(el => el.style.display = 'flex');
      document.querySelectorAll('.pricing-4w').forEach(el => el.style.display = 'none');
    }
  }

  // Gateway Modal Controls
  if (openGatewayBtn) {
    openGatewayBtn.addEventListener('click', () => {
      gatewayModal.classList.add('active');
      holdScreenBox.classList.remove('active');
      passcodeInput.value = '';
      passcodeInput.focus();
    });
  }
  if (closeGatewayBtn) {
    closeGatewayBtn.addEventListener('click', () => gatewayModal.classList.remove('active'));
  }

  // Quick Passcode Chips inside Gateway Modal
  document.querySelectorAll('.gateway-quick-code').forEach(chip => {
    chip.addEventListener('click', () => {
      passcodeInput.value = chip.dataset.code;
      handlePasscodeVerification();
    });
  });

  if (btnVerifyPasscode) {
    btnVerifyPasscode.addEventListener('click', handlePasscodeVerification);
  }
  if (passcodeInput) {
    passcodeInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handlePasscodeVerification();
    });
  }

  function handlePasscodeVerification() {
    const code = passcodeInput.value.trim();
    if (!code) return;

    (window.ccFetch || fetch)('/api/auth/validate-passcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode: code })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        gatewayModal.classList.remove('active');
        unlockPortal(data.role);
      } else {
        triggerHoldScreen(code);
      }
    })
    .catch(() => triggerHoldScreen(code));
  }

  function triggerHoldScreen(code) {
    (window.ccFetch || fetch)('/api/auth/security-hold', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requesterType: code.includes('105') ? "Partner Garage" : "Customer",
        name: "Gateway User",
        mobile: "+91 8333007351",
        vehicleOrGarage: state.currentMode === '2w' ? "2-Wheeler Fleet" : "4-Wheeler Fleet",
        purpose: "Dual-Passcode Gateway Access"
      })
    })
    .then(res => res.json())
    .then(data => {
      holdNoticeText.textContent = data.displayNotice || "Security Notice: System detecting active device session check... Your request has been securely routed to CC Motocrafts Central Verification Desk.";
      holdScreenBox.classList.add('active');
    });
  }

  function unlockPortal(role) {
    document.querySelectorAll('.portal-container').forEach(el => el.classList.remove('active'));

    if (role === 'partner') {
      const p = document.getElementById('partnerDashboardPortal');
      if (p) {
        p.classList.add('active');
        p.scrollIntoView({ behavior: 'smooth' });
        window.initPartnerDashboard && window.initPartnerDashboard();
      }
    } else if (role === 'customer') {
      const c = document.getElementById('customerLiveBayPortal');
      if (c) {
        c.classList.add('active');
        c.scrollIntoView({ behavior: 'smooth' });
        window.initCustomerLiveBay && window.initCustomerLiveBay();
        // Automatically fetch and load default live bay for seamless experience
        setTimeout(() => {
          const btnSubmit = document.getElementById('btnSubmitVerification');
          if (btnSubmit) btnSubmit.click();
        }, 200);
      }
    } else if (role === 'admin') {
      const a = document.getElementById('adminMasterPortal');
      if (a) {
        a.classList.add('active');
        a.scrollIntoView({ behavior: 'smooth' });
        window.initAdminMaster && window.initAdminMaster();
      }
    }
  }

  // 3D Engine Canvas Animation (60 FPS)
  const canvas = document.getElementById('engineCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let angle = 0;
    function resize() {
      canvas.width = canvas.parentElement.clientWidth - 36;
      canvas.height = 280;
    }
    resize();
    window.addEventListener('resize', resize);

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const is4w = body.classList.contains('mode-4w');
      const accent = is4w ? '#ff9100' : '#00e5ff';
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.32;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.4);
      ctx.beginPath();
      ctx.arc(0, 0, radius + 20, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      for (let i = 0; i < 24; i++) {
        const rad = (i * Math.PI) / 12;
        ctx.beginPath();
        ctx.moveTo(Math.cos(rad) * (radius + 14), Math.sin(rad) * (radius + 14));
        ctx.lineTo(Math.cos(rad) * (radius + 22), Math.sin(rad) * (radius + 22));
        ctx.strokeStyle = i % 6 === 0 ? accent : 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = i % 6 === 0 ? 2 : 1;
        ctx.stroke();
      }
      ctx.restore();

      const strokeOffset = Math.sin(angle) * (radius * 0.45);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 3;
      ctx.strokeRect(cx - radius * 0.45, cy - radius * 0.6, radius * 0.9, radius * 1.2);

      const pistonY = cy - radius * 0.3 + strokeOffset;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.fillRect(cx - radius * 0.42, pistonY, radius * 0.84, radius * 0.35);
      ctx.strokeStyle = accent;
      ctx.strokeRect(cx - radius * 0.42, pistonY, radius * 0.84, radius * 0.35);

      const crankX = cx + Math.cos(angle) * (radius * 0.3);
      const crankY = cy + radius * 0.5 + Math.sin(angle) * (radius * 0.2);
      ctx.beginPath();
      ctx.moveTo(cx, pistonY + radius * 0.3);
      ctx.lineTo(crankX, crankY);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Spark flash at top dead center
      if (Math.sin(angle) < -0.92) {
        ctx.beginPath();
        ctx.arc(cx, cy - radius * 0.55, 12, 0, Math.PI * 2);
        ctx.fillStyle = is4w ? 'rgba(255, 215, 0, 0.9)' : 'rgba(0, 229, 255, 0.9)';
        ctx.shadowColor = accent;
        ctx.shadowBlur = 24;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      angle += 0.06;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }
});
