const startBtn = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result');
const scoreContainer = document.getElementById('score-container');
const initialsInput = document.getElementById('initials');
const saveBtn = document.getElementById('save-btn');

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30; // Set the initial time for the quiz

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris'
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Venus', 'Jupiter'],
    correctAnswer: 'Mars'
  },
  // Add more questions as needed
];

startBtn.addEventListener('click', startQuiz);
saveBtn.addEventListener('click', saveScore);

function startQuiz() {
  startBtn.style.display = 'none';
  questionContainer.classList.remove('hide');
  nextQuestion();
  timer = setInterval(updateTimer, 1000);
}

function nextQuestion() {
  if (currentQuestionIndex < questions.length) {
    const currentQuestion = questions[currentQuestionIndex];
    displayQuestion(currentQuestion);
  } else {
    endQuiz();
  }
}

function displayQuestion(question) {
  document.getElementById('question').innerText = question.question;
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionBtn = document.createElement('button');
    optionBtn.innerText = option;
    optionBtn.addEventListener('click', () => checkAnswer(option, question.correctAnswer));
    optionsContainer.appendChild(optionBtn);
  });
}

function checkAnswer(selectedOption, correctAnswer) {
  if (selectedOption === correctAnswer) {
    score += 10; // Increase score for correct answers
    resultText.innerText = 'Correct!';
  } else {
    timeLeft -= 5; // Deduct time for incorrect answers
    resultText.innerText = 'Incorrect!';
  }

  currentQuestionIndex++;
  resultContainer.classList.remove('hide');
  setTimeout(() => {
    resultContainer.classList.add('hide');
    nextQuestion();
  }, 1000);
}

function updateTimer() {
  if (timeLeft <= 0) {
    endQuiz();
  } else {
    document.getElementById('timer').innerText = `Time: ${timeLeft}s`;
    timeLeft--;
  }
}

function endQuiz() {
  clearInterval(timer);
  questionContainer.classList.add('hide');
  scoreContainer.classList.remove('hide');
  document.getElementById('score').innerText = `Your Score: ${score}`;
}

function saveScore() {
  const initials = initialsInput.value.trim().toUpperCase();
  if (initials !== '') {
    // Implement your logic to save the score (e.g., store it in localStorage)
    alert(`Score saved for ${initials}: ${score}`);
  } else {
    alert('Please enter your initials.');
  }
}
