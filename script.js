const questions = [
  "Do you exercise regularly?",
  "Do you drink enough water?",
  "Do you sleep 7+ hours?"
];

let current = 0;

function loadQuestion() {
  document.getElementById("question").innerText = questions[current];
}

function answer(choice) {
  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").innerHTML = "<h3>Thank you!</h3>";
  }
}

loadQuestion();
