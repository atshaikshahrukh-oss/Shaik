/**
 * CC MOTOCRAFTS ENTERPRISE PLATFORM - CUSTOMER LIVE WORK BAY & DIGITAL JOB CARD
 * Access Code: cc1005
 * Features:
 * - 4-Step Verification & Dynamic Return Password
 * - 60 FPS WebRTC Low-Latency Live Bay Camera Stream Simulation
 * - 4-Stage Digital Job Card Tracker
 * - Real-Time "Add Instruction / Problem" Dispatched to Technician Screen
 */

window.initCustomerLiveBay = function () {
  const btnSubmit = document.getElementById('btnSubmitVerification');
  const otpModal = document.getElementById('otpModal');
  const btnVerifyOtp = document.getElementById('btnVerifyOtp');
  const liveTerminalContainer = document.getElementById('liveTerminalContainer');
  const canvas = document.getElementById('liveStreamCanvas');
  const streamCamTitle = document.getElementById('streamCamTitle');

  let activeJobCard = null;
  let activeCamView = "Overhead Engine Cam";
  let streamAnimId = null;

  if (btnSubmit) {
    btnSubmit.addEventListener('click', () => {
      const mobile = document.getElementById('custMobile').value.trim();
      const reg = document.getElementById('custReg').value.trim() || 'TS 09 EA 1234';

      (window.ccFetch || fetch)('/api/auth/dispatch-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, name: reg })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById('otpNoticeText').innerHTML = `
          <strong>Aapke Mobile, Email aur WhatsApp par verification password bhej diya gaya hai.</strong><br>
          <span style="color:var(--gold); font-family:monospace; font-size:12px;">Dynamic Test Passcode: <strong>${data.simulatedOtpForDemo}</strong></span>
        `;
        document.getElementById('otpInput').value = data.simulatedOtpForDemo;
        otpModal.classList.add('active');
      });
    });
  }

  if (btnVerifyOtp) {
    btnVerifyOtp.addEventListener('click', () => {
      const mobile = document.getElementById('custMobile').value.trim();
      const otp = document.getElementById('otpInput').value.trim();
      const reg = document.getElementById('custReg').value.trim() || 'TS 09 EA 1234';

      (window.ccFetch || fetch)('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp })
      })
      .then(res => res.json())
      .then(data => {
        if (data.verified) {
          otpModal.classList.remove('active');
          loadJobCard(reg);
        } else {
          alert("Invalid OTP Passcode. Please check your WhatsApp / Email.");
        }
      });
    });
  }

  function loadJobCard(regNumber) {
    const cleanReg = (regNumber || 'TS09EA1234').replace(/\s+/g, '').toUpperCase();

    (window.ccFetch || fetch)(`/api/job-cards/${encodeURIComponent(cleanReg)}`)
      .then(res => res.json())
      .then(card => {
        if (card.error) {
          (window.ccFetch || fetch)('/api/job-cards/TS09EA1234')
            .then(r => r.json())
            .then(fallbackCard => renderTerminal(fallbackCard));
          return;
        }
        renderTerminal(card);
      });
  }

  function renderTerminal(card) {
    activeJobCard = card;
    liveTerminalContainer.style.display = 'block';
    document.getElementById('custVerifyForm').parentElement.style.display = 'none';

    document.getElementById('cardRegHeader').textContent = card.customer.regNumber;
    document.getElementById('cardModelHeader').textContent = `${card.customer.vehicleModel} | ${card.bay}`;

    // Render 4 Stages
    renderStages(card.stages);

    // Render Notes
    renderCustomerNotes(card.customerNotes || []);

    // Start 60 FPS Camera
    startLiveCam();
  }

  function renderStages(stages) {
    document.getElementById('jobCardProgressTrack').innerHTML = stages.map(s => {
      const isCompleted = s.status === 'completed';
      const isInProg = s.status === 'in_progress';
      const badgeColor = isCompleted ? 'var(--success)' : (isInProg ? 'var(--warning)' : 'var(--text-dim)');

      return `
        <div style="background: rgba(0,0,0,0.3); border: 1px solid ${isInProg ? 'var(--warning)' : 'rgba(255,255,255,0.08)'}; padding: 12px; border-radius: 6px; margin-bottom: 8px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="color:#fff; font-size:13px;">Step ${s.step}: ${s.title}</strong>
            <span style="font-size:11px; color:${badgeColor}; font-weight:800; font-family:var(--font-mono);">
              ${s.status.toUpperCase()} ${isInProg ? `(${s.progressPercent || 65}%)` : ''}
            </span>
          </div>
          <p style="font-size:11.5px; color:var(--text-muted); margin-top:4px;">${s.notes}</p>
          <small style="color:var(--text-dim); font-size:10px;">${s.timestamp}</small>
        </div>
      `;
    }).join('');
  }

  function renderCustomerNotes(notes) {
    const list = document.getElementById('customerNotesList');
    if (!list) return;

    if (notes.length === 0) {
      list.innerHTML = `<p style="font-size:11.5px; color:var(--text-dim);">No extra instructions submitted yet.</p>`;
      return;
    }

    list.innerHTML = notes.map(n => `
      <div style="background:rgba(0,229,255,0.08); border-left:3px solid var(--theme-primary); padding:8px 10px; border-radius:4px; margin-top:6px; font-size:12px;">
        <p style="color:#fff;"><strong>"${n.text}"</strong></p>
        <small style="color:var(--text-muted);">${n.timestamp} | <span style="color:var(--success); font-weight:700;">${n.status}</span></small>
      </div>
    `).join('');
  }

  const btnAddNote = document.getElementById('btnAddProblemNote');
  if (btnAddNote) {
    btnAddNote.addEventListener('click', () => {
      const input = document.getElementById('newProblemInput');
      const text = input.value.trim();
      if (!text || !activeJobCard) return;

      (window.ccFetch || fetch)(`/api/job-cards/${activeJobCard.jobCardId}/add-note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: text })
      })
      .then(res => res.json())
      .then(data => {
        alert("Aapka problem note technician ke tablet par dispatch kar diya gaya hai!");
        activeJobCard.customerNotes.push(data.addedNote);
        renderCustomerNotes(activeJobCard.customerNotes);
        input.value = '';
      });
    });
  }

  // Camera View Switcher Buttons
  document.querySelectorAll('.cam-switch-btn').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.cam-switch-btn').forEach(btn => btn.classList.remove('active'));
      b.classList.add('active');
      activeCamView = b.dataset.cam;
      if (streamCamTitle) streamCamTitle.textContent = activeCamView;
    });
  });

  function startLiveCam() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = 640;
    canvas.height = 360;
    let frame = 0;

    function draw() {
      ctx.fillStyle = '#050a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Perspective Work Bay Grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.15)';
      ctx.lineWidth = 1;
      for (let y = 140; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Hydraulic Lift & Vehicle Shadow
      ctx.fillStyle = '#111a28';
      ctx.fillRect(180, 180, 280, 90);
      ctx.strokeStyle = '#00e5ff';
      ctx.strokeRect(180, 180, 280, 90);

      // Rotating Mechanical Component / Dyno Simulation
      ctx.save();
      ctx.translate(240, 220);
      ctx.rotate(frame * 0.05);
      ctx.beginPath();
      ctx.arc(0, 0, 28, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // Camera Crosshair
      ctx.strokeStyle = 'rgba(255, 51, 102, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - 30, canvas.height / 2);
      ctx.lineTo(canvas.width / 2 + 30, canvas.height / 2);
      ctx.moveTo(canvas.width / 2, canvas.height / 2 - 30);
      ctx.lineTo(canvas.width / 2, canvas.height / 2 + 30);
      ctx.stroke();

      // Camera HUD Overlays
      ctx.fillStyle = '#ff3366';
      ctx.beginPath();
      ctx.arc(28, 28, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = '12px SF Mono, monospace';
      ctx.fillText('REC 🔴 [LIVE WEBRTC LOW-LATENCY 60FPS]', 42, 32);

      const now = new Date();
      ctx.fillStyle = '#8b9bb4';
      ctx.font = '11px SF Mono, monospace';
      ctx.fillText(`${now.toLocaleDateString()} ${now.toLocaleTimeString()}:${String(frame % 60).padStart(2, '0')}`, 42, 50);
      ctx.fillText(`CAM: ${activeCamView} | WORK BAY #02 HYDERABAD`, 42, 68);

      // Privacy Watermark Stamp
      ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.font = '11px Segoe UI, sans-serif';
      ctx.fillText('CC MOTOCRAFTS PROTECTED STREAM - INTERNAL TOOLS MASKED', canvas.width - 340, canvas.height - 16);

      frame++;
      streamAnimId = requestAnimationFrame(draw);
    }

    if (streamAnimId) cancelAnimationFrame(streamAnimId);
    streamAnimId = requestAnimationFrame(draw);
  }
};
