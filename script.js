/**************** AUDIO ****************/
const typingSound = document.getElementById("typingSound");

/**************** SCREENS ****************/
const introScreen = document.getElementById("introScreen");
const introTerminal = document.getElementById("introTerminal");

const formScreen = document.getElementById("formScreen");
const scanScreen = document.getElementById("scanScreen");
const scanTerminal = document.getElementById("scanTerminal");

const welcomeScreen = document.getElementById("welcomeScreen");

/**************** FORM ELEMENTS ****************/
const encryptBtn = document.getElementById("encryptBtn");
const agentIdEl = document.getElementById("agentId");
const agentCodeEl = document.getElementById("agentCode");

const collegeIdInput = document.getElementById("collegeId");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const errorBox = document.getElementById("errorBox");

/**************** GLITCH ****************/
function glitchBurst(el, times = 4) {
  let count = 0;
  const interval = setInterval(() => {
    el.classList.toggle("glitch-frame");

    if (Math.random() > 0.6) {
      el.classList.add("glitch-hide");
      setTimeout(() => el.classList.remove("glitch-hide"), 40);
    }

    count++;
    if (count > times) {
      clearInterval(interval);
      el.classList.remove("glitch-frame", "glitch-hide");
    }
  }, 70);
}

/**************** AUDIO UNLOCK ****************/
//document.addEventListener("click", () => {
  //typingSound.volume = 0.4;
  //typingSound.play().then(() => {
   // typingSound.pause();
   // typingSound.currentTime = 0;
  //}).catch(() => {});
//}, { once: true });

/**************** TYPING ****************/
function typeLine(el, text, speed = 40) {
  return new Promise(resolve => {
    let i = 0;
    typingSound.loop = true;
    typingSound.play();

    const interval = setInterval(() => {
      el.innerHTML += text.charAt(i);
      i++;

      if (i >= text.length) {
        clearInterval(interval);
        typingSound.pause();
        typingSound.currentTime = 0;
        el.innerHTML += "\n";
        resolve();
      }
    }, speed);
  });
}

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**************** VALIDATION ****************/
function showError(msg, field) {
  errorBox.innerText = msg;
  document.querySelectorAll("input").forEach(i => i.classList.remove("error"));
  if (field) field.classList.add("error");
}

function clearError() {
  errorBox.innerText = "";
  document.querySelectorAll("input").forEach(i => i.classList.remove("error"));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**************** AGENT ID ****************/
function generateAgentId() {
  return "AX-" + Math.floor(1000 + Math.random() * 9000);
}

function generateCodeName() {
  const names = [
    "PHANTOM","SPECTRE","NIGHTFALL","SHADOW","ONYX","ECLIPSE","VORTEX",
    "SENTINEL","GHOST","BLACKOUT","NOVA","ZEROFOX","RAVEN","IRONBYTE",
    "DARKNET","CIPHER","KERNEL","OVERCLOCK","FIREWALL","ROOT",
    "NEXUS","VECTOR","MALWARE","HASH","HEX","PAYLOAD","BACKDOOR",
    "PROXY","TOR","ENIGMA","SILENTNODE","SKYNET","NIGHTCODE",
    "DEADLOCK","BITSTORM","CYBERWOLF","VOID","NULL","ALGORITHM","DATASHADOW"
  ];
  return names[Math.floor(Math.random() * names.length)];
}

/**************** GOOGLE SHEETS (FIXED) ****************/
function sendToSheets(payload) {
  fetch("https://script.google.com/macros/s/AKfycbwuo1I5DvcLOngpXtQzZZXXNdOhJ0FxGRs8FJM0XAsShkADszvgojfEz3qjXNNzQsQ9/exec", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(payload)
  });

  console.log("Registration sent");
}

/**************** INTRO ****************/
async function startIntro() {
  await typeLine(introTerminal, "Establishing secure channel...");
  glitchBurst(introTerminal);
  await wait(400);

  await typeLine(introTerminal, "Bypassing firewall...");
  glitchBurst(introTerminal);
  await wait(400);

  await typeLine(introTerminal, "Decrypting access node...");
  glitchBurst(introTerminal);
  await wait(400);

  await typeLine(introTerminal, "Connection secured.");
  glitchBurst(introTerminal);
  await wait(800);

  introScreen.classList.remove("active");
  formScreen.classList.add("active");
}

startIntro();

/**************** FORM → SCAN → SAVE ****************/
encryptBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value.trim();
  const collegeId = collegeIdInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  clearError();

  if (!name) return showError("AGENT NAME REQUIRED", document.getElementById("name"));
  if (!collegeId || collegeId.length < 4) return showError("INVALID COLLEGE ID", collegeIdInput);
  if (!/^\d{10}$/.test(phone)) return showError("INVALID PHONE NUMBER", phoneInput);
  if (!isValidEmail(email)) return showError("INVALID EMAIL FORMAT", emailInput);

  formScreen.classList.remove("active");
  scanScreen.classList.add("active");
  scanTerminal.innerHTML = "";

  await typeLine(scanTerminal, "Validating credentials...");
  await wait(400);
  await typeLine(scanTerminal, "Credentials verified");
  await wait(400);
  await typeLine(scanTerminal, "ACCESS GRANTED");
  await wait(600);

  scanScreen.classList.remove("active");
  welcomeScreen.classList.add("active");

  agentIdEl.innerText = generateAgentId();
  agentCodeEl.innerText = generateCodeName();

  // 🔥 SEND TO SHEETS
  sendToSheets({
    name,
    collegeId,
    phone,
    email,
    agentId: agentIdEl.innerText,
    codename: agentCodeEl.innerText
  });
});

