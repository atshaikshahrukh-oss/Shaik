/**
 * ENGINE 2: SERVICE ADVISOR & WARRANTY ENGINE
 */
window.initHtsEngine2 = function () {
  const custSearchInput = document.getElementById('custSearchInput');
  const btnCustSearch = document.getElementById('btnCustSearch');
  const customerTimelineResult = document.getElementById('customerTimelineResult');

  document.querySelectorAll('.cust-chip').forEach(c => {
    c.addEventListener('click', () => {
      custSearchInput.value = c.dataset.query;
      searchCust(c.dataset.query);
    });
  });

  btnCustSearch.addEventListener('click', () => searchCust(custSearchInput.value.trim()));

  function searchCust(q) {
    if (!q) return;
    (window.ccFetch || fetch)(`/api/customers/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(resList => {
        if (!resList || resList.length === 0) return;
        const c = resList[0];
        customerTimelineResult.innerHTML = `
          <div style="background:rgba(0,0,0,0.4); border:1px solid var(--bg-card-border); border-radius:8px; padding:16px;">
            <h4 style="color:#fff;">${c.name} (${c.regNumber}) - ${c.vehicleModel}</h4>
            <div style="background:linear-gradient(135deg, rgba(0,229,255,0.1), rgba(0,0,0,0.4)); border-left:3px solid var(--theme-primary); padding:10px; margin:10px 0; border-radius:4px;">
              <strong style="color:var(--theme-primary); font-size:11px;">🗣️ AI Recommended Pitch:</strong>
              <p style="color:#fff; font-size:13px; font-weight:600;">"${c.servicePitch}"</p>
            </div>
            <p style="font-size:12px; color:var(--text-muted);">Last Service: ${c.lastServiceDate} @ ${c.lastServiceKm} KM</p>
            <p style="font-size:12px; color:${c.warrantyStatus.isActive ? 'var(--success)' : 'var(--warning)'}; font-weight:700;">Warranty: ${c.warrantyStatus.type}</p>
          </div>
        `;
      });
  }

  document.getElementById('btnCheckWarranty').addEventListener('click', () => {
    const sType = document.getElementById('warrantyServiceType').value;
    const cKm = Number(document.getElementById('warrantyCurrentKm').value) || 0;
    const lKm = Number(document.getElementById('warrantyLastKm').value) || 0;
    (window.ccFetch || fetch)('/api/customers/warranty-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ serviceType: sType, currentKm: cKm, lastServiceKm: lKm })
    })
    .then(res => res.json())
    .then(data => {
      document.getElementById('warrantyResultCard').innerHTML = `
        <div style="background:rgba(0,0,0,0.5); border:1px solid var(--theme-primary); border-radius:6px; padding:12px; margin-top:10px;">
          <h5 style="color:var(--theme-primary);">🛡️ Warranty Status: ${data.warrantyCoverageText}</h5>
          ${data.firstServiceAlert ? `<p style="color:var(--danger); font-weight:800; font-size:13px;">🚨 500-750 KM FIRST OVERHAUL SERVICE DUE NOW!</p>` : ''}
          <ul style="font-size:12px; color:var(--text-muted); margin-top:6px; padding-left:18px;">
            ${data.strictConditions.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      `;
    });
  });

  document.getElementById('btnGenerateQuotation').addEventListener('click', () => {
    (window.ccFetch || fetch)('/api/quotations/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: "Syed Farhan", vehicleModel: "KTM Duke 390" },
        items: [{ description: "OBD-II Scan & Engine Tuning", qty: 1, rate: 1850 }],
        isGst: true
      })
    })
    .then(res => res.json())
    .then(q => {
      document.getElementById('quotationOutputBox').innerHTML = `
        <div style="background:rgba(0,0,0,0.4); border:1px solid var(--theme-primary); padding:14px; border-radius:6px; margin-top:10px;">
          <h4 style="color:#fff;">Quotation: ${q.quoteNumber} - Total: ₹${q.grandTotal}</h4>
          <a href="${q.shareableWhatsAppUrl}" target="_blank" class="btn-cyber-solid" style="background:#25D366; display:inline-block; margin-top:10px;">📱 Share on WhatsApp</a>
        </div>
      `;
    });
  });
};
