/**
 * MASTER ADMIN DASHBOARD (cc102)
 */
window.initAdminMaster = function () {
  (window.ccFetch || fetch)('/api/admin/overview')
    .then(res => res.json())
    .then(data => {
      document.getElementById('adminTotalRevenue').textContent = `₹${data.totalNetworkRevenue.toLocaleString('en-IN')}`;
      document.getElementById('adminTotalPartners').textContent = data.partnersCount;
      document.getElementById('adminActiveBays').textContent = data.activeJobCards;

      document.getElementById('securityHoldsTableBody').innerHTML = (data.securityHolds || []).map(h => `
        <tr>
          <td>${h.holdId}</td>
          <td>${h.requesterType}</td>
          <td>${h.name} (${h.mobile})</td>
          <td>${h.vehicleOrGarage}</td>
          <td>${h.purpose}</td>
          <td><span style="color:var(--warning); font-weight:700;">${h.status}</span></td>
          <td><button class="btn-cyber-solid" style="padding:4px 8px; font-size:11px;" onclick="approveHold('${h.holdId}')">Approve & Dispatch OTP</button></td>
        </tr>
      `).join('');

      document.getElementById('adminPartnersTableBody').innerHTML = (data.partners || []).map(p => `
        <tr>
          <td>${p.garageName}</td>
          <td>${p.ownerName}</td>
          <td>${p.mobile}</td>
          <td>${p.segment.toUpperCase()}</td>
          <td>${p.gstEnabled ? 'GST' : 'Non-GST'}</td>
          <td>₹${p.totalRevenue.toLocaleString('en-IN')}</td>
          <td><span style="color:var(--success);">ACTIVE</span></td>
        </tr>
      `).join('');
    });

  window.approveHold = function (holdId) {
    (window.ccFetch || fetch)('/api/admin/approve-hold', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ holdId })
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      window.initAdminMaster();
    });
  };
};
