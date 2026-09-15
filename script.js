const CONFIG = {
  name: "Anna",
};

const timeline = [
  { date: "When I asked you out", text: "I was soo nervous, but when you told yes, I was the happiest person in the world. Thank you sooooo much 🥰🥰🥰" },
  { date: "Our first date", text: "I'll never forget that day, June 13th 🥺🥺🥺. The first time we held hands, I felt like I was in a dream 🥺🥺." },
  { date: "Our first kiss", text: "The moment I kissed you, I knew I was completely and utterly in love with you 🥰🥰🥰🥰" },
  { date: "My Birthday", text: "You did soo much for me that I'll never forget. Thank you for making my birthday so special 🎂🎉" },
  { date: "Today", text: "Still choosing you, still smiling at you, still veryyyyy grateful you’re in my life. Thank you for everything 🥰🥰" },
];

const reasons = [
  "You literally have the best sense of humour, you make me laugh all the time. I never feel stressed when I'm around you. 🥰🥰🥰. Your jokes make me laugh every time.",
  "You put a lot of efforts into this relationship. Which makes me feel loved and appreciated. I love you so much for that. I'll never forget the things you do for me. 🥰🥰",
  "You're incredibly supportive, especially during my tough times. And you understand me in ways no one else does. 🥰🥰🥰🥰",
  "You look soooooo beautifulll....omggg sooo prettyyyyyyyyyyyy 😍😍😍",
  "Because you're you — and that's more than enough. I love you for exactly who you are, and I wouldn't change a thing about you. 🥰🥰🥰",
];

const memories = [
  { caption: "Adventure together", emoji: "🌅", src: "images/first-date.jpg" },
  { caption: "Date night", emoji: "🍕", src: "images/Photo2.jpg" },
  { caption: "Just us", emoji: "📸", src: "images/Photo3.jpg" },
  { caption: "My favorite smile", emoji: "😊", src: "images/Photo4.jpg" },
];

const comfortNotes = [
  { label: "…you're sad", text: "I'm always here for you. You can talk to me about anything. I'll always try my best to uplift you." },
  { label: "…you miss me", text: "Close your eyes for a second. I'm right there, thinking about you." },
  { label: "…you need a hug", text: "Consider this a long, warm hug that lasts as long as you need it. 🤗" },
  { label: "…you doubt yourself", text: "You are enough. More than enough. You don't have to prove anything to anyone — not even yourself. And I see it even when you don't." },
  { label: "…you're stressed", text: "One breath. One step. You've got this — and I've got you. You work extremely hard and I'm so proud of you." },
];

const compliments = [
  "You make me smile all the time. You have the best sense of humour and I love that about you. 🥺🥺🥺",
  "You are genuinely one of the smartest and the most hardworking person I know. I'm very proud of you 💪💪",
  "If I could pick anyone to do life with, it would always be you.",
  "You are the most beautiful person I know, inside and out. I love you so much. 🫶💌💕✨",
  "Every day with you is my favorite day. You make life better just by being in it.",
];

const dadJokes = [
  "How do you spot a blind person at a nude beach? It's not hard.",
  "Why don't eggs tell jokes? They'd crack each other up.",
  "what do you call a lazy sun? A slowlar panel. ☀️",
  "What do you call an expert fisherman? A master baiter. 🍝",
  "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
  "Why did the coffee file a police report? It got mugged. ☕",
];

// ─── State ───────────────────────────────────────────────────

let reasonIndex = 0;
let shuffledReasons = [...reasons];
let jokeIndex = 0;
let complimentIndex = 0;
let confettiActive = false;
let ambientHeartTimer = null;

// ─── DOM ─────────────────────────────────────────────────────

const introOverlay = document.getElementById("introOverlay");
const openEnvelopeBtn = document.getElementById("openEnvelopeBtn");
const envelope = document.getElementById("envelope");
const mainContent = document.getElementById("mainContent");
const confettiCanvas = document.getElementById("confettiCanvas");
const timelineEl = document.getElementById("timeline");
const photoGrid = document.getElementById("photoGrid");
const comfortTabs = document.getElementById("comfortTabs");
const comfortText = document.getElementById("comfortText");
const comfortDisplay = document.getElementById("comfortDisplay");
const letterSection = document.getElementById("letterSection");
const letterLock = document.getElementById("letterLock");
const reasonText = document.getElementById("reasonText");
const reasonDisplay = document.getElementById("reasonDisplay");
const reasonCount = document.getElementById("reasonCount");
const reasonTotal = document.getElementById("reasonTotal");
const nextReasonBtn = document.getElementById("nextReasonBtn");
const resetReasonsBtn = document.getElementById("resetReasonsBtn");
const jokeText = document.getElementById("jokeText");
const jokeDisplay = document.getElementById("jokeDisplay");
const nextJokeBtn = document.getElementById("nextJokeBtn");
const complimentText = document.getElementById("complimentText");
const complimentDisplay = document.getElementById("complimentDisplay");
const complimentBtn = document.getElementById("complimentBtn");

reasonTotal.textContent = reasons.length;

// ─── Helpers ─────────────────────────────────────────────────

function spawnHeart(x, y) {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = ["💕", "💖", "💗", "✨", "🌸", "🎂", "🎉"][Math.floor(Math.random() * 7)];
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty("--drift", `${Math.random() * 90 - 45}px`);
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2000);
}

function startAmbientHearts() {
  ambientHeartTimer = setInterval(() => {
    const x = Math.random() * Math.max(window.innerWidth - 80, 80);
    const y = Math.random() * Math.max(window.innerHeight * 0.55, 80);
    spawnHeart(x, y);
  }, 900);
}

function triggerReveal(el) {
  el.classList.remove("reveal");
  void el.offsetWidth;
  el.classList.add("reveal");
}

// ─── Confetti ────────────────────────────────────────────────

const confettiPieces = [];
const confettiColors = ["#e8a0b8", "#c76b8a", "#ffd89b", "#ffb347", "#fce4ec", "#fff"];

function resizeConfettiCanvas() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

function launchConfetti(count = 120) {
  if (confettiActive) return;
  confettiActive = true;
  resizeConfettiCanvas();

  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height * -0.5,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      rotation: Math.random() * 360,
      speed: Math.random() * 3 + 2,
      drift: Math.random() * 2 - 1,
    });
  }

  animateConfetti();
}

function animateConfetti() {
  const ctx = confettiCanvas.getContext("2d");
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach((p) => {
    p.y += p.speed;
    p.x += p.drift;
    p.rotation += 2;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });

  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    if (confettiPieces[i].y > confettiCanvas.height + 20) {
      confettiPieces.splice(i, 1);
    }
  }

  if (confettiPieces.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiActive = false;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

// ─── Intro envelope ──────────────────────────────────────────

function openEnvelope() {
  envelope.classList.add("opened");
  openEnvelopeBtn.disabled = true;
  openEnvelopeBtn.textContent = "Opening…";

  setTimeout(() => {
    introOverlay.classList.add("fade-out");
    mainContent.classList.remove("hidden");
    launchConfetti(150);
  }, 900);

  setTimeout(() => {
    introOverlay.remove();
  }, 1600);
}

// ─── Build sections ──────────────────────────────────────────

function buildTimeline() {
  timeline.forEach((item) => {
    const li = document.createElement("li");
    li.className = "timeline-item";
    li.innerHTML = `<span class="timeline-date">${item.date}</span><p class="timeline-text">${item.text}</p>`;
    timelineEl.appendChild(li);
  });
}

function buildPhotos() {
  memories.forEach((mem, i) => {
    const card = document.createElement("div");
    card.className = "photo-card";

    if (mem.src) {
      card.innerHTML = `<img src="${mem.src}" alt="${mem.caption}"><span class="photo-caption">${mem.caption}</span>`;
    } else {
      card.innerHTML = `
        <div class="photo-placeholder">
          <span class="photo-emoji">${mem.emoji}</span>
          <span class="photo-caption">${mem.caption}</span>
        </div>`;
    }

    card.addEventListener("click", (e) => {
      const rect = card.getBoundingClientRect();
      spawnHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
      card.classList.add("photo-pop");
      setTimeout(() => card.classList.remove("photo-pop"), 400);
    });

    photoGrid.appendChild(card);
  });
}

function buildComfortTabs() {
  comfortNotes.forEach((note, i) => {
    const btn = document.createElement("button");
    btn.className = "comfort-tab";
    btn.textContent = note.label;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".comfort-tab").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      comfortText.textContent = note.text;
      triggerReveal(comfortDisplay);
    });
    comfortTabs.appendChild(btn);
  });
}

// ─── Interactions ────────────────────────────────────────────

function unlockLetter() {
  letterSection.classList.remove("locked");
  letterLock.textContent = "Unlocked 💕";
  letterLock.classList.add("unlocked");
  launchConfetti(80);
  setTimeout(() => letterSection.scrollIntoView({ behavior: "smooth", block: "center" }), 300);
}

function revealReason() {
  if (reasonIndex >= shuffledReasons.length) return;

  reasonText.textContent = shuffledReasons[reasonIndex];
  triggerReveal(reasonDisplay);

  reasonIndex++;
  reasonCount.textContent = reasonIndex;

  const rect = nextReasonBtn.getBoundingClientRect();
  spawnHeart(rect.left + rect.width / 2, rect.top);

  if (reasonIndex >= shuffledReasons.length) {
    nextReasonBtn.textContent = "That's all of them — I love you 💕";
    nextReasonBtn.disabled = true;
    unlockLetter();
  }
}

function resetReasons() {
  reasonIndex = 0;
  shuffledReasons = [...reasons];
  reasonCount.textContent = "0";
  reasonText.textContent = "Ready when you are…";
  nextReasonBtn.textContent = "Tell me another reason";
  nextReasonBtn.disabled = false;
  reasonDisplay.classList.remove("reveal");
  letterSection.classList.add("locked");
  letterLock.textContent = "🔒 Read all the reasons first";
  letterLock.classList.remove("unlocked");
}

function showJoke() {
  jokeText.textContent = dadJokes[jokeIndex];
  jokeIndex = (jokeIndex + 1) % dadJokes.length;
  triggerReveal(jokeDisplay);

  const rect = nextJokeBtn.getBoundingClientRect();
  spawnHeart(rect.left + rect.width / 2, rect.top);
}

function showCompliment() {
  complimentText.textContent = compliments[complimentIndex];
  complimentIndex = (complimentIndex + 1) % compliments.length;
  triggerReveal(complimentDisplay);

  const rect = complimentBtn.getBoundingClientRect();
  spawnHeart(rect.left + rect.width / 2, rect.top);
}

// ─── Init ────────────────────────────────────────────────────

shuffledReasons = [...reasons];
buildTimeline();
buildPhotos();
buildComfortTabs();
resizeConfettiCanvas();
startAmbientHearts();

openEnvelopeBtn.addEventListener("click", openEnvelope);
nextReasonBtn.addEventListener("click", revealReason);
resetReasonsBtn.addEventListener("click", resetReasons);
nextJokeBtn.addEventListener("click", showJoke);
complimentBtn.addEventListener("click", showCompliment);

document.addEventListener("click", (e) => {
  if (introOverlay && document.body.contains(introOverlay)) return;
  if (e.target.closest("button, a")) return;
  spawnHeart(e.clientX, e.clientY);
});

window.addEventListener("resize", resizeConfettiCanvas);