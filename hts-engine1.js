/**
 * ENGINE 1: TECHNICAL & OBD DIAGNOSTIC AI
 */
window.initHtsEngine1 = function () {
  const obdSearchInput = document.getElementById('obdSearchInput');
  const btnObdSearch = document.getElementById('btnObdSearch');
  const btnVoiceMic = document.getElementById('btnVoiceMic');
  const btnSpeakerReplay = document.getElementById('btnSpeakerReplay');
  const diagnosticResultCard = document.getElementById('diagnosticResultCard');
  let lastVoice = "Diagnostic lab ready.";

  document.querySelectorAll('.code-chip').forEach(c => {
    c.addEventListener('click', () => {
      obdSearchInput.value = c.dataset.code;
      diagnose(c.dataset.code);
    });
  });

  btnObdSearch.addEventListener('click', () => diagnose(obdSearchInput.value.trim()));

  function diagnose(query) {
    if (!query) return;
    (window.ccFetch || fetch)('/api/obd/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    .then(res => res.json())
    .then(data => {
      if (data.found && data.result) {
        const r = data.result;
        lastVoice = `${r.code}. ${r.title}. ${r.master25YearAdvice}`;
        diagnosticResultCard.innerHTML = `
          <div style="background: rgba(0,229,255,0.05); border:1px solid var(--theme-primary); border-radius:8px; padding:16px;">
            <h4 style="color:var(--theme-primary);">🔍 [${r.code}] ${r.title}</h4>
            <p style="font-size:13px; color:var(--text-muted); margin:8px 0;"><strong>Scope:</strong> ${r.displacement} | <strong>Symptoms:</strong> ${r.symptoms.join(', ')}</p>
            <div style="background:rgba(0,0,0,0.4); padding:10px; border-radius:6px; margin:8px 0;">
              <strong style="color:#fff;">⚡ Multimeter Specs:</strong>
              <pre style="font-size:12px; color:var(--text-muted);">${JSON.stringify(r.multimeterSpecs, null, 2)}</pre>
            </div>
            <div style="background:rgba(255,179,0,0.1); border:1px dashed var(--warning); padding:10px; border-radius:6px;">
              <strong style="color:var(--warning);">🏆 Master 25-Year Workshop Advice:</strong>
              <p style="font-size:13px; color:#fff; font-style:italic;">"${r.master25YearAdvice}"</p>
            </div>
          </div>
        `;
        btnSpeakerReplay.style.display = 'inline-flex';
      }
    });
  }

  btnVoiceMic.addEventListener('click', () => {
    const code = prompt("Enter spoken OBD code (Voice input simulation):", "P0300");
    if (code) { obdSearchInput.value = code; diagnose(code); }
  });

  btnSpeakerReplay.addEventListener('click', () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(lastVoice);
      window.speechSynthesis.speak(u);
    } else {
      alert("Speaker voice: " + lastVoice);
    }
  });

  document.getElementById('btnAnalyzeSound').addEventListener('click', () => {
    const pattern = document.getElementById('soundPatternSelect').value;
    (window.ccFetch || fetch)('/api/obd/analyze-sound', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ soundType: pattern })
    })
    .then(res => res.json())
    .then(data => {
      const t = data.acousticTelemetry;
      document.getElementById('acousticResultBox').innerHTML = `
        <div style="background:rgba(0,229,255,0.08); padding:12px; border-radius:6px; margin-top:10px;">
          <h5 style="color:var(--theme-primary); font-size:14px;">🔊 Acoustic Fault: ${t.identifiedFault}</h5>
          <p style="font-size:12px; color:var(--text-muted);">Freq: ${t.frequency} | Severity: <span style="color:var(--danger);">${t.severity}</span></p>
          <p style="font-size:12px; color:#fff; margin-top:4px;"><strong>Recommended:</strong> ${t.recommendedAction}</p>
        </div>
      `;
    });
  });
};
