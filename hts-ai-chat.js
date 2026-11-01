/**
 * CC MOTOCRAFTS - HTS MASTER AI DIAGNOSTIC CHAT ASSISTANT
 * 25-Year Master Mechanical Workshop AI Brain
 * Features:
 * - Conversational diagnostic assistant (Hyderabadi / Hindi / English)
 * - OBD-II code troubleshooting & multimeter specs
 * - Warranty & maintenance rule explanations
 * - Hands-free microphone voice input & speaker voice replay (TTS)
 * - 1-Click direct booking via chat
 */

window.initHtsAiChat = function () {
  const chatWidgetBtn = document.getElementById('htsChatWidgetBtn');
  const chatWindow = document.getElementById('htsChatWindow');
  const btnCloseChat = document.getElementById('btnCloseChat');
  const chatMessagesList = document.getElementById('chatMessagesList');
  const chatUserInput = document.getElementById('chatUserInput');
  const btnSendChat = document.getElementById('btnSendChat');
  const btnChatMic = document.getElementById('btnChatMic');
  const chatChipPrompts = document.querySelectorAll('.chat-chip-prompt');

  if (!chatWidgetBtn || !chatWindow) return;

  chatWidgetBtn.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    if (chatWindow.classList.contains('active')) {
      chatUserInput.focus();
    }
  });

  if (btnCloseChat) {
    btnCloseChat.addEventListener('click', () => {
      chatWindow.classList.remove('active');
    });
  }

  // Quick Prompt Chips
  chatChipPrompts.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.dataset.prompt || chip.textContent;
      sendUserMessage(promptText);
    });
  });

  if (btnSendChat) {
    btnSendChat.addEventListener('click', () => {
      const text = chatUserInput.value.trim();
      if (text) sendUserMessage(text);
    });
  }

  if (chatUserInput) {
    chatUserInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const text = chatUserInput.value.trim();
        if (text) sendUserMessage(text);
      }
    });
  }

  // Voice Input (Web Speech Recognition)
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (btnChatMic) {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'hi-IN';
      recognition.continuous = false;

      btnChatMic.addEventListener('click', () => {
        btnChatMic.style.background = 'var(--danger)';
        btnChatMic.title = 'Listening... Speak your vehicle problem now!';
        recognition.start();
      });

      recognition.onresult = (e) => {
        const spoken = e.results[0][0].transcript;
        btnChatMic.style.background = '';
        sendUserMessage(spoken);
      };

      recognition.onerror = () => {
        btnChatMic.style.background = '';
      };
      recognition.onend = () => {
        btnChatMic.style.background = '';
      };
    } else {
      btnChatMic.addEventListener('click', () => {
        const val = prompt("Speak or type your vehicle fault (e.g., 'KTM knocking sound' or 'P0300 Misfire'):", "P0300");
        if (val) sendUserMessage(val);
      });
    }
  }

  function appendMessage(sender, text, isAi = false, actionBtn = null) {
    const msgDiv = document.createElement('div');
    msgDiv.style = `margin-bottom: 12px; display: flex; flex-direction: column; align-items: ${isAi ? 'flex-start' : 'flex-end'};`;

    const bubble = document.createElement('div');
    bubble.style = `
      max-width: 85%;
      padding: 10px 14px;
      border-radius: ${isAi ? '12px 12px 12px 2px' : '12px 12px 2px 12px'};
      background: ${isAi ? 'rgba(11, 20, 34, 0.95)' : 'var(--theme-primary)'};
      color: ${isAi ? '#f0f6fc' : '#000'};
      border: 1px solid ${isAi ? 'var(--bg-card-border)' : 'var(--theme-primary)'};
      font-size: 13px;
      line-height: 1.45;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;

    bubble.innerHTML = `<strong>${sender}:</strong><br>${text}`;
    if (actionBtn) {
      const btn = document.createElement('div');
      btn.style = 'margin-top: 8px;';
      btn.innerHTML = actionBtn;
      bubble.appendChild(btn);
    }

    msgDiv.appendChild(bubble);
    chatMessagesList.appendChild(msgDiv);
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;

    // Speaker Voice Synthesis for AI replies
    if (isAi && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const plainText = text.replace(/<[^>]*>?/gm, '');
      const utterance = new SpeechSynthesisUtterance(plainText.slice(0, 140));
      utterance.lang = 'hi-IN';
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  function sendUserMessage(text) {
    appendMessage("You", text, false);
    chatUserInput.value = '';

    // Simulate AI thinking and smart diagnostic matching
    setTimeout(() => {
      const upper = text.toUpperCase();
      let reply = "";
      let action = `<a href="https://wa.me/918333007351?text=${encodeURIComponent(`Hi CC Motocrafts, I have a question regarding: ${text}`)}" target="_blank" class="btn-cyber-solid" style="padding: 4px 10px; font-size: 11px; display: inline-block;">💬 Book on WhatsApp (+91 8333007351)</a>`;

      if (upper.includes("P0300") || upper.includes("MISFIRE")) {
        reply = `<strong>OBD-II Fault P0300: Random / Multiple Cylinder Misfire Detected.</strong><br>
        • <em>25-Yr Master Advice:</em> Pehle spark plug ka gap check karo (0.7-0.8mm). HT coil primary resistance 0.8-1.5 Ohms honi chahiye. Agar white carbon dry hai toh intake manifold rubber O-ring se vacuum leak check karo!`;
      } else if (upper.includes("TAPPET") || upper.includes("KNOCK") || upper.includes("AWAAZ") || upper.includes("SOUND")) {
        reply = `<strong>Engine Acoustic Mechanical Analysis:</strong><br>
        • Agar high-pitch metallic ticking sound hai (1.2-2.4 kHz) jo engine speed ke saath double hoti hai, toh yeh <em>Loose Valve Tappet Clearance</em> hai.<br>
        • Feeler gauge se lash calibrate karein: Intake 0.08-0.10mm, Exhaust 0.12-0.15mm cold.<br>
        • Agar heavy thudding awaz hai under load, toh connecting rod big-end bearing play hai—immediate teardown zaroori hai!`;
      } else if (upper.includes("ACTIVA") || upper.includes("CVT") || upper.includes("MILEAGE") || upper.includes("SCOOTER")) {
        reply = `<strong>Gearless Scooter CVT Diagnostic:</strong><br>
        • Low pickup aur engine rev badhne par gadi slow uthne ka matlab variator rollers flat ho chuke hain ya drive belt width 18.5mm se kam ho gayi hai.<br>
        • CC Motocrafts 30-Day CVT Overhaul package mein clutch bell degreasing aur variator ramp cleaning shamil hai.`;
      } else if (upper.includes("WARRANTY") || upper.includes("GUARANTEE")) {
        reply = `<strong>CC Motocrafts Strict Warranty Rules:</strong><br>
        • <em>General Service:</em> 30 Days Working Guarantee on tuned parts.<br>
        • <em>Engine Rebuild Overhaul:</em> 1-Year Engine Warranty (Crankshaft, Cylinder Bore Kit, Valves covered).<br>
        • <em>Mandatory Condition:</em> Pehla service 500-750 KM (15-30 days) ke andar karwana zaroori hai, warna 1-Year warranty void ho jayegi! Routine maintenance har 1,800-2,000 KM par zaroori hai.`;
      } else if (upper.includes("CRETA") || upper.includes("CAR") || upper.includes("4W") || upper.includes("THAR")) {
        reply = `<strong>CarS CareS 4-Wheeler Diagnostic Lab (500cc - 15,000cc):</strong><br>
        • Hydraulic 2-post lifts, 3D laser wheel alignment, Launch X431 OBD live telemetry scanner, aur CRDi injector bench testing hamare Banjara Hills aur Secunderabad workshops par available hain.<br>
        • Gachibowli VIP 20km radius mein doorstep pickup free hai!`;
      } else {
        reply = `<strong>HTS Master Diagnostic AI Assistant:</strong><br>
        Aapka query receive ho gaya hai. Hamare 25-Year Master Workshop database ke mutabiq aapka issue solve karne ke liye diagnostic bay booking schedule ki ja sakti hai.<br>
        Aap direct call ya WhatsApp kar sakte hain hotline: <strong>+91 8333007351</strong>.`;
      }

      appendMessage("HTS Master AI", reply, true, action);
    }, 400);
  }
};
