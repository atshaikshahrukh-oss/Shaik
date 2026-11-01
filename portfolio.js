/**
 * CC MOTOCRAFTS - 30-ITEM LIVE WORKSHOP ACTION & ENGINEERING PORTFOLIO
 * 15 Two-Wheeler + 15 Four-Wheeler Real Action Cards
 * Features:
 * - Work Title & 2-Line Clear Description (Work in progress, tools used, technician role)
 * - Official CC Motocrafts Watermark on Bottom-Right of each visual card
 * - Direct [Book Service] button on every card
 * - 1-Click WhatsApp Booking Modal with Name, Vehicle Model, Problem, Area (+91 8333007351)
 */

window.initPortfolioGallery = function () {
  const portfolioGrid = document.getElementById('portfolioCardsGrid');
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  
  // WhatsApp Booking Modal Elements
  const portBookingModal = document.getElementById('portBookingModal');
  const btnClosePortBookingModal = document.getElementById('btnClosePortBookingModal');
  const portBookServiceName = document.getElementById('portBookServiceName');
  const portBookCustName = document.getElementById('portBookCustName');
  const portBookVehicleModel = document.getElementById('portBookVehicleModel');
  const portBookProblem = document.getElementById('portBookProblem');
  const portBookArea = document.getElementById('portBookArea');
  const btnSubmitPortWhatsApp = document.getElementById('btnSubmitPortWhatsApp');

  // Detail Inspector Modal
  const portfolioModal = document.getElementById('portfolioDetailModal');
  const btnClosePortModal = document.getElementById('btnClosePortModal');
  const portModalBody = document.getElementById('portModalBody');

  let portfolioItems = [];
  let currentCategory = 'all';
  let selectedServiceForBooking = null;

  function loadPortfolio() {
    (window.ccFetch || fetch)('/api/portfolio')
      .then(res => res.json())
      .then(data => {
        portfolioItems = data;
        renderPortfolio();
      })
      .catch(err => console.error('Failed to load portfolio:', err));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderPortfolio();
    });
  });

  function renderPortfolio() {
    if (!portfolioGrid) return;

    let items = portfolioItems;
    if (currentCategory === '2w') {
      items = portfolioItems.filter(p => p.category === '2w');
    } else if (currentCategory === '4w') {
      items = portfolioItems.filter(p => p.category === '4w');
    } else if (currentCategory === 'Engine Overhaul') {
      items = portfolioItems.filter(p => p.title.toLowerCase().includes('overhaul') || p.tag.toLowerCase().includes('overhaul'));
    }

    let html = '';
    items.forEach((item, index) => {
      const is2w = item.category === '2w';
      const badgeColor = is2w ? 'var(--theme-primary)' : 'var(--warning)';
      const accentColor = is2w ? '#00e5ff' : '#ff9100';

      // Rich Visual SVG Card with Technical Blueprint & CC MOTOCRAFTS Watermark
      const illustrationSvg = `
        <div style="position: relative; overflow: hidden; border-radius: 8px 8px 0 0; background: ${is2w ? 'radial-gradient(circle at 50% 40%, #0d1e33 0%, #050a12 100%)' : 'radial-gradient(circle at 50% 40%, #261608 0%, #0a0603 100%)'}; border-bottom: 1px solid var(--bg-card-border);">
          <svg viewBox="0 0 400 220" width="100%" height="190" style="display: block;">
            <defs>
              <linearGradient id="grad_${item.id}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.9"/>
                <stop offset="100%" stop-color="#000" stop-opacity="0.8"/>
              </linearGradient>
            </defs>

            <!-- Grid & Aerospace Tech Markings -->
            <line x1="20" y1="20" x2="380" y2="20" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1" stroke-dasharray="3,3"/>
            <line x1="20" y1="195" x2="380" y2="195" stroke="rgba(255, 255, 255, 0.08)" stroke-width="1"/>

            <!-- Scene Graphics -->
            ${is2w ? `
              <!-- 2-Wheeler Mechanical Scene -->
              <circle cx="200" cy="105" r="55" fill="none" stroke="${accentColor}" stroke-width="1.5" stroke-dasharray="4,4"/>
              <circle cx="200" cy="105" r="42" fill="rgba(0, 229, 255, 0.08)" stroke="#fff" stroke-width="1"/>
              <!-- Engine Cylinder Head & Valve Core -->
              <rect x="155" y="70" width="90" height="70" rx="8" fill="#091320" stroke="${accentColor}" stroke-width="2"/>
              <circle cx="180" cy="95" r="10" fill="#1b2a40" stroke="#fff" stroke-width="1.5"/>
              <circle cx="220" cy="95" r="10" fill="#1b2a40" stroke="#fff" stroke-width="1.5"/>
              <line x1="180" y1="105" x2="180" y2="135" stroke="#ffd700" stroke-width="2.5"/>
              <line x1="220" y1="105" x2="220" y2="135" stroke="#ffd700" stroke-width="2.5"/>
              <!-- Tool Icon: Torque Wrench -->
              <line x1="80" y1="50" x2="130" y2="90" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
              <rect x="70" y="42" width="22" height="12" rx="3" fill="${accentColor}"/>
            ` : `
              <!-- 4-Wheeler Workshop Scene -->
              <!-- Hydraulic 2-Post Lift Frame -->
              <rect x="35" y="25" width="12" height="170" fill="#2d1c0b" stroke="${accentColor}" stroke-width="1.5"/>
              <rect x="353" y="25" width="12" height="170" fill="#2d1c0b" stroke="${accentColor}" stroke-width="1.5"/>
              <line x1="42" y1="115" x2="358" y2="115" stroke="${accentColor}" stroke-width="3"/>
              <!-- Car Elevation Silhouette -->
              <rect x="90" y="85" width="220" height="42" rx="8" fill="#150e06" stroke="#ffb300" stroke-width="2"/>
              <path d="M 125 85 L 155 58 L 245 58 L 275 85 Z" fill="#0d0803" stroke="${accentColor}" stroke-width="1.5"/>
              <!-- Oscilloscope Waveform underneath car -->
              <path d="M 80 155 Q 120 125, 160 155 T 240 155 T 320 155" fill="none" stroke="#00e676" stroke-width="2"/>
            `}

            <!-- Top Left Tag -->
            <rect x="20" y="28" width="95" height="22" rx="4" fill="rgba(0,0,0,0.6)" stroke="${accentColor}" stroke-width="1"/>
            <text x="67" y="42" font-size="9" fill="${accentColor}" font-weight="bold" text-anchor="middle" font-family="monospace">
              #${String(index + 1).padStart(2, '0')} ${is2w ? '2-WHEELER' : '4-WHEELER'}
            </text>

            <!-- Bottom Left Telemetry Status -->
            <circle cx="28" cy="180" r="4" fill="#00e676"/>
            <text x="38" y="183" font-size="9" fill="#8b9bb4" font-family="monospace">${item.area}</text>
          </svg>

          <!-- OFFICIAL WATERMARK EMBEDDED ON BOTTOM-RIGHT CORNER -->
          <div style="position: absolute; bottom: 8px; right: 10px; background: rgba(0, 0, 0, 0.75); border: 1px solid rgba(255, 255, 255, 0.3); border-radius: 4px; padding: 3px 8px; display: flex; align-items: center; gap: 5px; pointer-events: none; z-index: 2; box-shadow: 0 2px 8px rgba(0,0,0,0.8);">
            <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: ${accentColor};"></span>
            <span style="font-size: 9.5px; font-weight: 900; letter-spacing: 0.8px; color: #fff; text-transform: uppercase; font-family: 'Segoe UI', sans-serif;">
              CC MOTOCRAFTS
            </span>
          </div>
        </div>
      `;

      html += `
        <div class="pricing-card" style="padding: 0; overflow: hidden; border: 1px solid var(--bg-card-border); background: var(--bg-card); display: flex; flex-direction: column; transition: transform 0.2s ease, border-color 0.2s ease;">
          ${illustrationSvg}
          <div style="padding: 18px; flex: 1; display: flex; flex-direction: column;">
            
            <!-- Category Tag & Workshop Bay -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 11px; font-weight: 800; color: ${badgeColor}; font-family: var(--font-mono); text-transform: uppercase;">
                ${item.tag}
              </span>
              <span style="font-size: 10px; background: rgba(0, 230, 118, 0.15); color: var(--success); padding: 2px 6px; border-radius: 4px; font-weight: 700;">
                VERIFIED LAB WORK
              </span>
            </div>

            <!-- Work Title -->
            <h4 style="font-size: 16px; font-weight: 800; color: #fff; margin-bottom: 8px; line-height: 1.3;">
              ${item.title}
            </h4>

            <!-- 2-Line Clear Description (Work in progress, tools, technicians) -->
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 12px; line-height: 1.5; min-height: 54px;">
              ${item.workDescription}
            </p>

            <!-- Tools & Technician Box -->
            <div style="background: rgba(0,0,0,0.35); padding: 10px 12px; border-radius: 6px; margin-bottom: 14px; font-size: 11.5px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: var(--text-dim); margin-bottom: 3px;">
                <strong style="color: #fff;">🔧 Tools:</strong> ${item.toolsUsed}
              </p>
              <p style="color: var(--text-dim);">
                <strong style="color: #fff;">👨‍🔧 Team:</strong> ${item.technicians}
              </p>
            </div>

            <!-- Direct Book Service & Specs Buttons -->
            <div style="margin-top: auto; display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 8px;">
              <button class="btn-cyber-solid" style="padding: 9px 12px; font-size: 12.5px; font-weight: 800;" onclick="window.openBookServiceModal('${item.id}')">
                ⚡ Book This Service
              </button>
              <button class="btn-cyber" style="padding: 9px 8px; font-size: 11.5px; text-align: center;" onclick="window.viewPortfolioSpecs('${item.id}')">
                🔍 Specs
              </button>
            </div>

          </div>
        </div>
      `;
    });

    portfolioGrid.innerHTML = html;
  }

  // -----------------------------------------------------------------
  // 1-CLICK WHATSAPP BOOKING POPUP MODAL
  // -----------------------------------------------------------------
  window.openBookServiceModal = function (id) {
    const item = portfolioItems.find(p => p.id === id);
    if (!item) return;

    selectedServiceForBooking = item;
    portBookServiceName.textContent = item.title;
    portBookVehicleModel.value = item.vehicle.split('/')[0].trim();
    portBookProblem.value = `Require ${item.title} for my vehicle.`;

    portBookingModal.classList.add('active');
    portBookCustName.focus();
  };

  if (btnClosePortBookingModal) {
    btnClosePortBookingModal.addEventListener('click', () => {
      portBookingModal.classList.remove('active');
    });
  }

  if (btnSubmitPortWhatsApp) {
    btnSubmitPortWhatsApp.addEventListener('click', (e) => {
      e.preventDefault();
      const name = portBookCustName.value.trim() || "Customer";
      const vehicle = portBookVehicleModel.value.trim() || "My Vehicle";
      const problem = portBookProblem.value.trim() || "Service Required";
      const area = portBookArea.value.trim() || "Gachibowli, Hyderabad";
      const serviceName = selectedServiceForBooking ? selectedServiceForBooking.title : "CC Motocrafts Service";

      // Pre-filled WhatsApp Message as per Developer Brief
      const waText = `Hi CC Motocrafts, I want to book ${serviceName} for my ${vehicle}. Name: ${name}, Area: ${area}. Problem: ${problem}`;
      const waUrl = `https://wa.me/918333007351?text=${encodeURIComponent(waText)}`;

      portBookingModal.classList.remove('active');
      window.open(waUrl, '_blank');
    });
  }

  // View Specs Modal
  window.viewPortfolioSpecs = function (id) {
    const item = portfolioItems.find(p => p.id === id);
    if (!item) return;

    portModalBody.innerHTML = `
      <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 14px;">
        <span style="font-size: 11px; font-weight: 800; color: var(--theme-primary); font-family: var(--font-mono);">${item.tag}</span>
        <h3 style="color: #fff; font-size: 19px; font-weight: 800; margin-top: 4px;">${item.title}</h3>
        <p style="font-size: 13px; color: var(--theme-primary); font-weight: 700;">Vehicle: ${item.vehicle}</p>
        <p style="font-size: 12px; color: var(--text-muted);">Lead Team: <strong>${item.technicians}</strong></p>
      </div>

      <div style="background: rgba(0,0,0,0.4); padding: 12px; border-radius: 6px; margin-bottom: 12px;">
        <h5 style="color: var(--theme-primary); font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">🔧 Tools & Equipment Used:</h5>
        <p style="font-size: 12.5px; color: #fff;">${item.toolsUsed}</p>
      </div>

      <div style="background: rgba(0, 229, 255, 0.08); border-left: 3px solid var(--theme-primary); padding: 12px 14px; border-radius: 4px; margin-bottom: 16px;">
        <h5 style="color: var(--theme-primary); font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">2-Line Technical Description:</h5>
        <p style="font-size: 12.5px; color: #fff; line-height: 1.5;">"${item.workDescription}"</p>
      </div>

      <button class="btn-cyber-solid" style="width: 100%;" onclick="window.openBookServiceModal('${item.id}')">
        ⚡ Book This Service on WhatsApp (+91 8333007351)
      </button>
    `;

    portfolioModal.classList.add('active');
  };

  if (btnClosePortModal) {
    btnClosePortModal.addEventListener('click', () => {
      portfolioModal.classList.remove('active');
    });
  }

  loadPortfolio();
};
