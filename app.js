// =========================================================
// SHAT-DRISHTI — Powered by IGRIS Engine
// =========================================================

const home = document.getElementById('homeScreen');
const app = document.getElementById('appScreen');
const screenTitle = document.getElementById('screenTitle');
const titles = {
  aura:'AURA — Hawa Ka Ehsaas',
  smriti:'SMRITI — Yaadon Ka Google Map',
  sparsh:'SPARSH — Chhoo Ke Dekho',
  saathi:'SAATHI — Dil Ka Doctor',
  disha:'DISHA — Aazadi Module',
  sangam:'SANGAM — Duniya Se Judo'
};

function openScreen(key){
  home.classList.add('hidden');
  app.classList.remove('hidden');
  document.querySelectorAll('.screen').forEach(s=>s.classList.add('hidden'));
  document.getElementById(key).classList.remove('hidden');
  screenTitle.textContent = titles[key];
  window.scrollTo(0,0);
}

document.querySelectorAll('.chakra-item').forEach(el=>{
  el.addEventListener('click', ()=> openScreen(el.dataset.go));
});

document.getElementById('backBtn').addEventListener('click', ()=>{
  app.classList.add('hidden');
  home.classList.remove('hidden');
});

// =========================================================
// GLOBAL SPEECH ENGINE
// =========================================================
function speakText(text, lang = 'en-US') {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; 
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }
}

let recognition = null;
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
}

function startVoiceCommand(btn, onResult) {
  if (!recognition) {
    alert("Voice recognition not supported in this browser. Try Chrome.");
    return;
  }
  if (btn.classList.contains('listening')) {
    recognition.stop();
    btn.classList.remove('listening');
    btn.innerHTML = "🎤 Listen";
    return;
  }

  btn.classList.add('listening');
  btn.innerHTML = "🛑 Listening...";
  
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    btn.classList.remove('listening');
    btn.innerHTML = "🎤 Listen";
    onResult(text);
  };

  recognition.onerror = () => {
    btn.classList.remove('listening');
    btn.innerHTML = "🎤 Listen";
  };

  recognition.onend = () => {
    btn.classList.remove('listening');
    btn.innerHTML = "🎤 Listen";
  };

  recognition.start();
}

// =========================================================
// 1. AURA
// =========================================================
const auraStart = document.getElementById('auraStart');
const auraLog = document.getElementById('auraLog');
const auraDot = document.getElementById('auraDot');
const auraStatus = document.getElementById('auraStatus');
const auraVideo = document.getElementById('auraVideo');
const simulateBtn = document.getElementById('simulateBtn');
const aiOverlay = document.getElementById('aiOverlay');
const aiText = document.getElementById('aiText');
const aiBoxText = document.getElementById('aiBoxText');
const voiceToggle = document.getElementById('voiceToggle');

let auraRunning = false;
let mediaStream = null;
let isFaceCurrentlyDetected = false;
let videoInterval = null;

function addAuraLog(text, isWarn = false){
  const d = document.createElement('div');
  d.className = 'entry';
  d.textContent = text;
  if(isWarn) d.style.borderLeftColor = '#ff3355';
  auraLog.prepend(d);
  if(auraLog.children.length > 6) auraLog.removeChild(auraLog.lastChild);
}

async function processVideo() {
  if (!auraRunning) return;
  try {
    if ('FaceDetector' in window) {
      const faceDetector = new window.FaceDetector();
      const faces = await faceDetector.detect(auraVideo);
      const hasFace = faces.length > 0;

      if (hasFace) {
        if(!isFaceCurrentlyDetected) {
          isFaceCurrentlyDetected = true;
          addAuraLog("AI: Face detected.", true);
          aiBoxText.textContent = "FACE DETECTED";
          aiText.textContent = "Someone is here";
          aiOverlay.classList.remove('hidden');
          aiOverlay.style.display = 'flex';
          speakText("Someone is in front of the camera.");
          setTimeout(() => { aiOverlay.style.display = 'none'; }, 3000);
        }
      } else {
        if(isFaceCurrentlyDetected) {
          isFaceCurrentlyDetected = false;
          addAuraLog("AI: Scene empty.", true);
          aiBoxText.textContent = "SCENE EMPTY";
          aiText.textContent = "No one is here";
          aiOverlay.classList.remove('hidden');
          aiOverlay.style.display = 'flex';
          speakText("No one is in front of camera.");
          setTimeout(() => { aiOverlay.style.display = 'none'; }, 3000);
        }
      }
    }
  } catch(e) {
    console.log("Face API not supported or error.");
  }
}

function toggleAura(forceState) {
  const turnOn = forceState !== undefined ? forceState : !auraRunning;

  if (!turnOn) {
    auraRunning = false;
    if(mediaStream){ mediaStream.getTracks().forEach(t=>t.stop()); mediaStream = null; }
    auraVideo.srcObject = null;
    auraVideo.classList.remove('active');
    auraDot.classList.remove('on');
    auraStatus.textContent = "Camera OFF";
    auraStart.textContent = "Camera ON karo";
    auraStart.style.background = "#00d4ff";
    auraStart.style.color = "#00060a";
    simulateBtn.classList.add('hidden');
    aiOverlay.classList.add('hidden');
    clearInterval(videoInterval);
    speakText("Camera turned off.");
    addAuraLog("Camera turned off.");
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      mediaStream = stream;
      auraVideo.srcObject = stream;
      setTimeout(async () => {
        await auraVideo.play(); 
        auraVideo.classList.add('active');
        auraRunning = true;
        auraDot.classList.add('on');
        auraStatus.textContent = "Camera LIVE";
        auraStart.textContent = "Camera OFF karo";
        auraStart.style.background = "#ff3355";
        auraStart.style.color = "#fff";
        simulateBtn.classList.remove('hidden');
        
        addAuraLog("System: Demo starting. Camera ON.");
        speakText("This is a demo. Camera is turning on.");

        videoInterval = setInterval(processVideo, 1000);
      }, 500);
    })
    .catch(err => {
      auraStatus.textContent = "Camera Error";
      addAuraLog("Camera access denied.", true);
    });
}

auraStart.addEventListener('click', () => toggleAura());

voiceToggle.addEventListener('click', () => {
  startVoiceCommand(voiceToggle, (text) => {
    const cmd = text.toLowerCase();
    addAuraLog(`You said: "${text}"`);
    if (cmd.includes('start') || cmd.includes('on') || cmd.includes('camera')) {
      toggleAura(true);
    } else if (cmd.includes('stop') || cmd.includes('off') || cmd.includes('close')) {
      toggleAura(false);
    } else if (cmd.includes('danger') || cmd.includes('alert')) {
      simulateBtn.click();
    } else {
      speakText("I heard you, but that's not a camera command.");
    }
  });
});

simulateBtn.addEventListener('click', ()=>{
  if(!auraRunning) return;
  const eventData = [
    { text: "Someone approaching from behind", alert: "Warning! Someone approaching from behind." },
    { text: "Door is open", alert: "Alert! The door is open." }
  ][Math.floor(Math.random() * 2)];

  addAuraLog(eventData.text, true);
  aiBoxText.textContent = "AI DETECTED";
  aiText.textContent = eventData.text;
  aiOverlay.classList.remove('hidden');
  aiOverlay.style.display = 'flex'; 
  speakText(eventData.alert);

  setTimeout(()=>{
    aiOverlay.classList.add('hidden');
    aiOverlay.style.display = 'none'; 
  }, 3500);
});

// =========================================================
// 2. SMRITI
// =========================================================
const smritiChat = document.getElementById('smritiChat');
const smritiInput = document.getElementById('smritiInput');
const smritiSend = document.getElementById('smritiSend');
const smritiVoiceToggle = document.getElementById('smritiVoiceToggle');

const memoryDB = {
  "wallet":"2 steps back, on the table, under the bag. You kept it there 10 minutes ago.",
  "keys":"Hanging on the hook near the door. It's been there since yesterday evening.",
  "phone":"On the charging table, next to the laptop. Battery is at 78%.",
  "default":"I remember... but I am scanning the exact location right now."
};

function addMsg(text, cls){
  const d = document.createElement('div');
  d.className = 'msg ' + cls;
  d.textContent = text;
  smritiChat.appendChild(d);
  smritiChat.scrollTop = smritiChat.scrollHeight;
}

function askSmriti(q){
  if (!q.trim()) return;
  addMsg(q, 'user');
  const key = q.toLowerCase();
  let ans = memoryDB.default;
  if(key.includes('wallet')) ans = memoryDB.wallet;
  else if(key.includes('key')) ans = memoryDB.keys;
  else if(key.includes('phone') || key.includes('mobile')) ans = memoryDB.phone;

  setTimeout(()=>{
    addMsg(ans, 'bot');
    speakText(ans);
  }, 500);
}

smritiSend.addEventListener('click', ()=>{
  const q = smritiInput.value.trim();
  if(!q) return;
  askSmriti(q);
  smritiInput.value = '';
});
smritiInput.addEventListener('keydown', e=>{
  if(e.key==='Enter') smritiSend.click();
});
document.querySelectorAll('.quick-asks .chip').forEach(c=>{
  c.addEventListener('click', ()=> askSmriti(c.dataset.q));
});

smritiVoiceToggle.addEventListener('click', () => {
  startVoiceCommand(smritiVoiceToggle, (text) => {
    smritiInput.value = text;
    askSmriti(text);
  });
});

// =========================================================
// 3. SPARSH — Vibration + Visual Haptic Simulation
// =========================================================
const sparshLog = document.getElementById('sparshLog');

// Haptic Sound Synthesizer (For Laptop/Desktop simulation)
function playHapticBuzz(durationMs) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    
    // Fade out to simulate realistic vibration
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (durationMs / 1000));
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + (durationMs / 1000));
  } catch(e) { console.log("AudioContext not supported"); }
}

// Visual Shake (For Laptop/Desktop simulation)
function shakeScreen() {
  const body = document.body;
  body.style.animation = 'none';
  body.offsetHeight; // trigger reflow
  body.style.animation = 'hapticShake 0.4s';
}

const vibPatterns = {
  left:    { pattern:[200],       label:"Left object — left vibration" },
  right:   { pattern:[200],       label:"Right object — right vibration" },
  front:   { pattern:[500],       label:"Front danger — long vibration" },
  door:    { pattern:[120,80,120],label:"Door — 2 short vibrations" }
};

document.querySelectorAll('.vib-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const p = vibPatterns[btn.dataset.pattern];
    document.querySelectorAll('.vib-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    // 1. Real Mobile Vibration
    if(navigator.vibrate){
      navigator.vibrate(p.pattern);
    } 
    
    // 2. Fallback: Audio Buzzing & Screen Shake (For Laptops)
    let totalDuration = p.pattern.reduce((a, b) => a + b, 0);
    playHapticBuzz(totalDuration);
    shakeScreen();

    // 3. Log update
    const d = document.createElement('div');
    d.className = 'entry';
    d.textContent = p.label;
    sparshLog.prepend(d);
    if(sparshLog.children.length > 5) sparshLog.removeChild(sparshLog.lastChild);
  });
});

// =========================================================
// 4. SAATHI
// =========================================================
const saathiOutput = document.getElementById('saathiOutput');
const emotionLines = {
  fake_smile: "The lady in front is fake smiling — she is nervous.",
  happy_friend: "Your friend is laughing — crack a joke!",
  angry: "The person in front is angry — keep distance.",
  nervous: "They are nervous — talk carefully."
};

document.querySelectorAll('.emo-card').forEach(card=>{
  card.addEventListener('click', ()=>{
    const key = card.dataset.emo;
    const textLine = emotionLines[key];
    
    saathiOutput.textContent = textLine;
    saathiOutput.animate([{opacity:.4},{opacity:1}], {duration:300});
    speakText(textLine);
  });
});

// =========================================================
// 5. DISHA & 6. SANGAM
// =========================================================
const dishaPanel = document.getElementById('dishaPanel');
const dishaData = {
  thali: `<b>THALI MODE</b><br><br>"Rice at 12 o'clock, dal at 3 o'clock.<br>A little is left — finish it."`,
  letsgo: `<b>LETSGO MODE</b><br><br>"2 tables are empty in the cafe.<br>Walk straight 5 steps."`,
  aazad: `<b>AAZAD MODE</b><br><br>"Blue t-shirt at Zara is 50% off.<br>Counter is 15 steps straight."`
};

document.querySelectorAll('#disha .tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    document.querySelectorAll('#disha .tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    dishaPanel.innerHTML = dishaData[t.dataset.mode];
  });
});
dishaPanel.innerHTML = dishaData.thali;

const sangamPanel = document.getElementById('sangamPanel');
const sangamData = {
  swar: `<b>SWAR MODE — Audio Instagram</b><br><br>"Record the sound of a tea stall" → share it.`,
  khel: `<b>KHEL MODE — Inclusive Fun</b><br><br>• Audio Chess — play by listening<br>• Echo-location game`,
  setu: `<b>SETU MODE — Deaf-Blind Bridge</b><br><br>Sign Language → Vibration → Braille<br><br>"Those who cannot see, cannot hear — but they can feel."`
};

document.querySelectorAll('#sangam .tab').forEach(t=>{
  t.addEventListener('click', ()=>{
    document.querySelectorAll('#sangam .tab').forEach(x=>x.classList.remove('active'));
    t.classList.add('active');
    sangamPanel.innerHTML = sangamData[t.dataset.sangam];
  });
});
sangamPanel.innerHTML = sangamData.swar;