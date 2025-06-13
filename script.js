
const questions = [
  {
    text: "La fiebre es perjudicial para los niños.",
    isTrue: false,
    reason: "La fiebre no es una enfermedad ni algo dañino por sí mismo, sino un mecanismo de defensa del organismo ante la infección."
  },
  {
    text: "Una fiebre alta provoca daño cerebral y se debe bajar de inmediato.",
    isTrue: false,
    reason: "Por lo general la fiebre no supera los 42 °C y a esa temperatura no causa daño cerebral ni en otros órganos."
  },
  {
    text: "Los antipiréticos curan la enfermedad que causa la fiebre.",
    isTrue: false,
    reason: "Los antipiréticos solo bajan la temperatura, pero no curan la infección que provoca la fiebre."
  },
  {
    text: "La mejor forma de medir la fiebre es con un termómetro digital en la axila.",
    isTrue: true,
    reason: "Medir la temperatura en la axila con termómetro digital es seguro y preciso en niños."
  },
  {
    text: "Para bajar la fiebre rápidamente, hay que bañarse con agua fría.",
    isTrue: false,
    reason: "El agua fría puede provocar escalofríos y hacer que el cuerpo suba aún más la temperatura."
  },
  {
    text: "Se puede evitar la fiebre impidiendo el contacto con virus o bacterias.",
    isTrue: false,
    reason: "Es imposible evitar completamente el contacto con virus y bacterias en el entorno."
  },
  {
    text: "Cuando se tiene fiebre, es importante tomar más líquidos de lo normal.",
    isTrue: true,
    reason: "Con la fiebre se pierde más líquido, por lo que es importante mantenerse hidratado."
  },
  {
    text: "Si la fiebre es muy alta, es por infección bacteriana; si es baja, es viral.",
    isTrue: false,
    reason: "Ambos tipos de infección pueden causar fiebre alta; no se diferencian por la temperatura."
  },
  {
    text: "La dentición suele causar fiebre alta en los bebés.",
    isTrue: false,
    reason: "La dentición puede causar febrícula, pero no fiebre alta. Si hay fiebre, la causa es otra."
  },
  {
    text: "Si un niño se siente caliente al tacto, seguro que tiene fiebre.",
    isTrue: false,
    reason: "Solo un termómetro puede confirmar si hay fiebre; el tacto no es suficiente."
  }
];

let currentQuestionIndex = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const endScreen = document.getElementById('end-screen');
const questionText = document.getElementById('question-text');
const trueBtn = document.getElementById('true-btn');
const falseBtn = document.getElementById('false-btn');
const feedbackDiv = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const scoreText = document.getElementById('score-text');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const correctAudio = new Audio('sounds/correct.wav');
const wrongAudio = new Audio('sounds/wrong.wav');

startBtn.addEventListener('click', startGame);
function startGame() {
  startScreen.style.display = 'none';
  quizScreen.style.display = 'block';
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionText.textContent = q.text;
  feedbackDiv.style.display = 'none';
  feedbackDiv.innerHTML = '';
  nextBtn.style.display = 'none';
  trueBtn.disabled = false;
  falseBtn.disabled = false;
}

trueBtn.addEventListener('click', () => handleAnswer(true));
falseBtn.addEventListener('click', () => handleAnswer(false));

function handleAnswer(userAnswer) {
  trueBtn.disabled = true;
  falseBtn.disabled = true;
  const q = questions[currentQuestionIndex];
  if (userAnswer === q.isTrue) {
    score++;
    feedbackDiv.innerHTML = "<p class='correct-msg'>¡Correcto!</p>";
    correctAudio.play();
  } else {
    feedbackDiv.innerHTML = "<p class='wrong-msg'>¡Incorrecto!</p>";
    wrongAudio.play();
  }
  const veracidad = q.isTrue ? "verdadera" : "falsa";
  feedbackDiv.innerHTML += "<p>La afirmación es <b>" + veracidad + "</b>. " + q.reason + "</p>";
  feedbackDiv.style.display = 'block';
  nextBtn.textContent = currentQuestionIndex < questions.length - 1 ? 'Siguiente' : 'Finalizar';
  nextBtn.style.display = 'inline-block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endGame();
  }
});

function endGame() {
  quizScreen.style.display = 'none';
  endScreen.style.display = 'block';
  scoreText.textContent = "Respondiste correctamente " + score + " de " + questions.length + " preguntas.";
}

restartBtn.addEventListener('click', () => {
  endScreen.style.display = 'none';
  startScreen.style.display = 'block';
});
