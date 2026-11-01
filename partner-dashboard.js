/**
 * CC MOTOCRAFTS ENTERPRISE PLATFORM - PARTNER GARAGE & TECHNICIAN DASHBOARD
 * Features:
 * - Isolated Workshop Revenue & Job Cards
 * - Profile Setup (GST, Trade License, Pollution Cert Toggles)
 * - Official Watermark Invoice & PDF Export Engine
 */

window.initPartnerDashboard = function () {
  const partnerSelect = document.getElementById('partnerSelect');
  const gstToggle = document.getElementById('gstToggle');
  const tradeLicenseToggle = document.getElementById('tradeLicenseToggle');
  const partnerGstNum = document.getElementById('partnerGstNum');
  const partnerLicenseNum = document.getElementById('partnerLicenseNum');
  const btnSavePartnerProfile = document.getElementById('btnSavePartnerProfile');
  const partnerStatsRevenue = document.getElementById('partnerStatsRevenue');
  const partnerStatsInvoices = document.getElementById('partnerStatsInvoices');
  const btnGenerateInvoice = document.getElementById('btnGenerateInvoice');
  const invoicePreviewContainer = document.getElementById('invoicePreviewContainer');

  let currentPartner = null;
  let partnersList = [];

  (window.ccFetch || fetch)('/api/partners')
    .then(res => res.json())
    .then(partners => {
      partnersList = partners;
      partnerSelect.innerHTML = '';
      partners.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${p.garageName} (${p.location.split(',')[1] || p.location})`;
        partnerSelect.appendChild(opt);
      });
      if (partners.length > 0) selectPartner(partners[0].id);
    });

  partnerSelect.addEventListener('change', (e) => selectPartner(e.target.value));

  function selectPartner(id) {
    currentPartner = partnersList.find(p => p.id === id);
    if (!currentPartner) return;
    gstToggle.checked = Boolean(currentPartner.gstEnabled);
    tradeLicenseToggle.checked = Boolean(currentPartner.tradeLicenseEnabled);
    partnerGstNum.value = currentPartner.gstNumber || '';
    partnerLicenseNum.value = currentPartner.tradeLicenseNo || '';
    partnerStatsRevenue.textContent = `₹${(currentPartner.totalRevenue || 0).toLocaleString('en-IN')}`;
    partnerStatsInvoices.textContent = currentPartner.totalInvoices || 0;
  }

  btnSavePartnerProfile.addEventListener('click', () => {
    if (!currentPartner) return;
    (window.ccFetch || fetch)(`/api/partners/${currentPartner.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gstEnabled: gstToggle.checked,
        gstNumber: partnerGstNum.value.trim(),
        tradeLicenseEnabled: tradeLicenseToggle.checked,
        tradeLicenseNo: partnerLicenseNum.value.trim()
      })
    })
    .then(res => res.json())
    .then(data => {
      alert(`[CC MOTOCRAFTS GATEWAY]\nProfile & Smart Toggles updated for ${currentPartner.garageName}`);
      currentPartner = data.updated;
    });
  });

  btnGenerateInvoice.addEventListener('click', () => {
    if (!currentPartner) return;
    const name = document.getElementById('invCustomerName').value.trim() || "Syed Farhan";
    const mobile = document.getElementById('invCustomerMobile').value.trim() || "+91 9849112233";
    const vehicle = document.getElementById('invVehicleModel').value.trim() || "KTM Duke 390";
    const reg = document.getElementById('invRegNumber').value.trim() || "TS 09 EA 1234";

    (window.ccFetch || fetch)('/api/invoices/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        partnerId: currentPartner.id,
        isGst: gstToggle.checked,
        customer: { name, mobile, vehicleModel: vehicle, regNumber: reg },
        items: [
          { description: "Precision OBD-II ECU Scan & Telemetry Reset", hsn: "9987", qty: 1, rate: 650 },
          { description: "Motul 300V 15W50 Synthetic Engine Oil (1.7L)", hsn: "2710", qty: 1, rate: 1850 },
          { description: "OEM KTM Oil Filter & Viton O-Ring Seal Kit", hsn: "8421", qty: 1, rate: 280 },
          { description: "Front Brembo Sintered Brake Pads", hsn: "8714", qty: 1, rate: 1450 },
          { description: "Master Workshop Labor: Valve Tappet Calibration & Coolant Flush", hsn: "9987", qty: 1, rate: 1200 }
        ]
      })
    })
    .then(res => res.json())
    .then(resData => {
      renderInvoice(resData.invoice);
    });
  });

  function renderInvoice(inv) {
    const isTax = inv.isGst && inv.gstNumber;

    invoicePreviewContainer.innerHTML = `
      <div id="printableInvoiceSheet" class="invoice-sheet-container" style="background:#fff; color:#1a1a1a; padding:32px 36px; border-radius:8px; position:relative; overflow:hidden; margin-top:20px; box-shadow:0 12px 36px rgba(0,0,0,0.5);">
        
        <!-- Official CC MOTOCRAFTS Authenticity Hologram Stamp -->
        <div class="invoice-watermark-seal">
          <div class="seal-circle-text">CC MOTOCRAFTS LABS</div>
          <div class="seal-center-badge">25 YR EXP<br>VERIFIED</div>
          <div class="seal-subtext">TS-HYD-500032</div>
        </div>

        <div class="inv-header">
          <div class="inv-brand">
            <h2 style="color:#0d47a1; margin-bottom:4px;">CC MOTOCRAFTS NETWORK</h2>
            <p><strong>Workshop:</strong> ${inv.partnerName}</p>
            <p>Central Hotline: +91 8333007351 | Email: info@ccmotocrafts.in</p>
            ${isTax ? `<p style="color:#0d47a1; font-weight:700;">GSTIN: ${inv.gstNumber}</p>` : '<p style="color:#666;">(Non-GST Retail Bill)</p>'}
            ${inv.tradeLicense ? `<p>Trade License: ${inv.tradeLicense}</p>` : ''}
          </div>
          <div style="text-align:right;">
            <h3 style="font-size:18px; color:#111; text-transform:uppercase;">${isTax ? 'TAX INVOICE' : 'RETAIL INVOICE'}</h3>
            <p><strong>Invoice #:</strong> ${inv.invoiceNo}</p>
            <p><strong>Date:</strong> ${inv.date}</p>
          </div>
        </div>

        <div class="inv-details-grid">
          <div class="inv-details-box">
            <h4>Billed To (Customer Details)</h4>
            <p><strong>Name:</strong> ${inv.customer.name}</p>
            <p><strong>Mobile:</strong> ${inv.customer.mobile}</p>
            <p><strong>Email:</strong> ${inv.customer.email || 'customer@gmail.com'}</p>
          </div>
          <div class="inv-details-box">
            <h4>Vehicle & Diagnostic Registry</h4>
            <p><strong>Vehicle Model:</strong> ${inv.customer.vehicleModel}</p>
            <p><strong>Registration No:</strong> <span style="font-family:monospace; font-weight:bold; background:#e2e8f0; padding:2px 6px; border-radius:4px;">${inv.customer.regNumber}</span></p>
            <p><strong>Watermark Auth:</strong> CC-MOTO-SECURE-STAMP-AUTO</p>
          </div>
        </div>

        <table class="inv-table">
          <thead>
            <tr><th>#</th><th>Description of Goods / Diagnostic Labor</th><th>HSN/SAC</th><th>Qty</th><th>Unit Rate</th><th>Total (INR)</th></tr>
          </thead>
          <tbody>
            ${inv.items.map((it, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td><strong>${it.description}</strong></td>
                <td>${it.hsn || '9987'}</td>
                <td>${it.qty}</td>
                <td>₹${it.rate.toFixed(2)}</td>
                <td>₹${(it.qty * it.rate).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div class="inv-summary-box">
          <table class="inv-summary-table">
            <tr><td>Sub Total:</td><td style="text-align:right;">₹${inv.subTotal.toFixed(2)}</td></tr>
            ${isTax ? `
              <tr><td>CGST (9%):</td><td style="text-align:right;">₹${inv.cgst.toFixed(2)}</td></tr>
              <tr><td>SGST (9%):</td><td style="text-align:right;">₹${inv.sgst.toFixed(2)}</td></tr>
            ` : ''}
            <tr class="total-row"><td>Grand Total:</td><td style="text-align:right;">₹${inv.grandTotal.toFixed(2)}</td></tr>
          </table>
        </div>

        <div class="inv-warranty-terms">
          <p><strong>WARRANTY & STRICT MAINTENANCE TERMS:</strong></p>
          <p>• General Service: 30 Days Working Guarantee on workmanship.</p>
          <p>• Engine Rebuild Overhaul: 1-Year Warranty on Crank, Bore, and Valves. Mandatory first inspection between 500-750 KM (15-30 days). Wear-and-tear components excluded.</p>
        </div>

        <!-- Action Bar: Print to PDF or Save -->
        <div style="margin-top:24px; text-align:right; display:flex; justify-content:flex-end; gap:12px;">
          <button class="btn-cyber-solid btn-print-action" onclick="window.print()">
            🖨️ Print / Save Clean PDF
          </button>
        </div>
      </div>
    `;

    invoicePreviewContainer.scrollIntoView({ behavior: 'smooth' });
  }
};
