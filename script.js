const questions = [
  {
    question: "Which movie has the famous line, “I’ll be back”?",
    options: ["The Matrix","Terminator 2: Judgment Day","Die Hard","Jurassic Park"],
    answer: 1,
    fact: "Arnold Schwarzenegger almost said, “I’ll return,” but “I’ll be back” became iconic!"
  },
  {
    question: "True or False: A day on Venus is longer than a year on Venus.",
    options: ["True","False"],
    answer: 0,
    fact: "Venus spins so slowly that one rotation (a day) takes 243 Earth days, while it orbits the Sun in 225 Earth days!"
  },
  {
    question: "Which artist had the most-streamed song globally on Spotify in 2024?",
    options: ["Taylor Swift","The Weeknd","Billie Eilish","Bad Bunny"],
    answer: 2,
    fact: "Billie’s “Birds of a Feather” went viral on TikTok, fueling its chart‑topping success!"
  },
  {
    question: "What animal became a viral meme in 2023 for “staring” intensely?",
    options: ["Grumpy Cat","Side‑Eye Dog","Staring Hamster","Distracted Boyfriend"],
    answer: 2,
    fact: "Staring Hamster GIFs flooded X, used for everything from awkward moments to funny reactions!"
  },
  {
    question: "Which of these was invented FIRST?",
    options: ["The telephone","The light bulb","The bicycle","The camera"],
    answer: 2,
    fact: "The bicycle (1817) predates the camera (1839), telephone (1876), and light bulb (1879)!"
  },
  {
    question: "What food trend took over social media in 2025?",
    options: ["Sushi Burritos","Cloud Bread","Butter Boards","Mini Pancake Cereal"],
    answer: 2,
    fact: "Butter Boards (spreadable butter art) went viral for their aesthetic appeal on Instagram Reels!"
  },
  {
    question: "Which game sold over 200 million copies by 2025, making it one of the best‑selling ever?",
    options: ["Fortnite","Minecraft","GTA V","Tetris"],
    answer: 1,
    fact: "Minecraft’s endless creativity keeps it trending across generations!"
  },
  {
    question: "True or False: Octopuses have three hearts and can change color to blend into their surroundings.",
    options: ["True","False"],
    answer: 0,
    fact: "Octopuses are basically underwater superheroes, using camouflage to hide from predators!"
  },
  {
    question: "What tech trend was everyone talking about on X in early 2025?",
    options: ["Foldable Phones","AI‑Powered Glasses","Flying Taxis","Holographic TVs"],
    answer: 1,
    fact: "AI glasses with real‑time translation and AR displays became a hot topic for their sci‑fi vibes!"
  },
  {
    question: "Which of these is an actual world record?",
    options: ["Most socks worn on one foot (52 socks)","Longest time spent in a tree (2 years)","Largest pizza ever made (13,957 sq ft)","All of the above"],
    answer: 3,
    fact: "These quirky records make for perfect shareable content online!"
  }
];

let current = 0;
let score = 0;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const factText = document.getElementById('fact-text');
const questionCounter = document.getElementById('question-counter');
const resultTitle = document.getElementById('result-title');
const resultScore = document.getElementById('result-score');
const shareBtn = document.getElementById('share-btn');

document.getElementById('start-btn').addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);
shareBtn.addEventListener('click', shareScore);

function startQuiz() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  current = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  const q = questions[current];
  questionCounter.textContent = `Question ${current + 1} / ${questions.length}`;
  questionText.textContent = q.question;
  optionsContainer.innerHTML = '';
  factText.classList.add('hidden');
  nextBtn.disabled = true;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = opt;
    btn.addEventListener('click', () => selectAnswer(btn, idx));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(btn, idx) {
  const q = questions[current];
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(b => b.disabled = true);

  if (idx === q.answer) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    optionButtons[q.answer].classList.add('correct');
  }
  factText.textContent = q.fact;
  factText.classList.remove('hidden');
  nextBtn.disabled = false;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');
  resultScore.textContent = `Your Score: ${score} / ${questions.length}`;

  let title = '';
  if (score >= 8) {
    title = '🎉 Trivia Titan! 🎉';
  } else if (score >= 5) {
    title = '💡 Brainy Buddy! 💡';
  } else {
    title = '😂 Meme Master! 😂';
  }
  resultTitle.textContent = title;
}

function shareScore() {
  const text = encodeURIComponent(`I scored ${score}/${questions.length} on the #ViralTriviaChallenge! Can you beat me? 🚀`);
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function restartQuiz() {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}

