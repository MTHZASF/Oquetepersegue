// ==============================
// CONFIGURAÇÃO
// ==============================
// Troque "Eldrath" pela senha que você quiser.
const SENHA_CORRETA = "ASSASSINO";

let tentativas = 0;

const form = document.getElementById("password-form");
const password = document.getElementById("password");
const message = document.getElementById("message");
const attempts = document.getElementById("attempts");

const loginScreen = document.getElementById("login-screen");
const doorScene = document.getElementById("door-scene");
const door = document.getElementById("door");
const doorMessage = document.getElementById("door-message");

const bloodLayer = document.getElementById("blood-layer");
const jumpscare = document.getElementById("jumpscare");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const digitada = password.value;

  if (digitada === SENHA_CORRETA) {
    abrirPorta();
    return;
  }

  tentativas++;
  password.value = "";

  if (tentativas >= 3) {
    iniciarSangue();
  } else {
    message.textContent = "Senha incorreta...";
    attempts.textContent = `Tentativas: ${tentativas}/3`;
  }
});

function abrirPorta() {
  loginScreen.classList.add("hidden");
  doorScene.classList.remove("hidden");

  doorMessage.textContent = "A porta está fechada...";

  // Pequena pausa para a porta aparecer antes de abrir.
  setTimeout(() => {
    door.classList.add("open");
    doorMessage.textContent = "Você abriu a porta.";
  }, 700);
}

function iniciarSangue() {
  message.textContent = "Algo mudou...";
  attempts.textContent = "Tentativas esgotadas.";

  document.body.classList.add("blood-mode");
  jumpscare.classList.remove("hidden");

  // Cria gotas em posições aleatórias.
  for (let i = 0; i < 70; i++) {
    criarGota(i * 35);
  }

  // Depois de alguns segundos, deixa a tela vermelha escura.
  setTimeout(() => {
    jumpscare.classList.add("hidden");
  }, 3200);
}

function criarGota(delay) {
  const drop = document.createElement("div");
  drop.className = "blood-drop";

  const width = Math.floor(Math.random() * 24) + 8;
  const height = Math.floor(Math.random() * 90) + 35;
  const duration = (Math.random() * 2.8 + 2.2).toFixed(2);

  drop.style.left = `${Math.random() * 100}%`;
  drop.style.setProperty("--w", `${width}px`);
  drop.style.setProperty("--h", `${height}px`);
  drop.style.setProperty("--duration", `${duration}s`);
  drop.style.animationDelay = `${delay}ms`;

  bloodLayer.appendChild(drop);

  // Limpa o elemento depois da animação.
  setTimeout(() => drop.remove(), delay + Number(duration) * 1000 + 1000);
}
