const typingSound = document.getElementById("typingSound");

const loginScreen = document.getElementById("loginScreen");
const briefingScreen = document.getElementById("briefingScreen");
const briefingTerminal = document.getElementById("briefingTerminal");

const agentNameInput = document.getElementById("agentNameInput");
const agentIdInput = document.getElementById("agentIdInput");
const loginError = document.getElementById("loginError");
const verifyBtn = document.getElementById("verifyBtn");
// 🔒 WORKSHOP ENTRY WINDOW
const WORKSHOP_START = new Date("2025-12-30T23:00:00");
const WORKSHOP_END   = new Date("2025-12-31T16:00:00");

/* 🔓 unlock audio */
document.addEventListener("click", () => {
  typingSound.volume = 0.4;
  typingSound.play().then(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  }).catch(() => {});
}, { once: true });

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

function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/* VERIFY AGENT */
verifyBtn.addEventListener("click", async () => {
  const name = agentNameInput.value.trim();
  const agentId = agentIdInput.value.trim();

  loginError.innerText = "";

  if (!name || !agentId) {
    loginError.innerText = "CREDENTIALS REQUIRED";
    return;
  }

  if (!/^AX-\d{4}$/.test(agentId)) {
    loginError.innerText = "INVALID AGENT ID FORMAT";
    return;
  }
  const now = new Date();

if (now < WORKSHOP_START || now > WORKSHOP_END) {
  document.body.innerHTML = `
    <div style="
      background:black;
      color:#ff4444;
      font-family:monospace;
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      text-align:center;
      letter-spacing:2px;
    ">
      <div>
        <h1>ACCESS LOCKED</h1>
        <p>Workshop entry not active.</p>
      </div>
    </div>
  `;
  throw new Error("Workshop locked");
}


  // ✅ VERIFIED (logic can be expanded later)
  loginScreen.classList.remove("active");
  briefingScreen.classList.add("active");

  await typeLine(briefingTerminal, "AGENT VERIFIED");
  glitchBurst(briefingTerminal, 4);
  await wait(500);

  await typeLine(briefingTerminal, `WELCOME ${name.toUpperCase()}`);
  await wait(500);

  await typeLine(briefingTerminal, "MISSION BRIEFING INITIATED");
  glitchBurst(briefingTerminal, 5);
  await wait(600);

  await typeLine(
    briefingTerminal,
    "OBJECTIVE:\n- Understand cyber threats\n- Observe live attack demos\n- Learn defense techniques\n- Maintain operational secrecy"
  );

  await wait(500);
  await typeLine(briefingTerminal, "STATUS: ACTIVE");
});


