let current = 0;

// 🧠 Category scores
let scores = {
  comfortable: 0,   // باقة المرتاحين
  debt: 0,          // باقة المديونين
  struggling: 0     // باقة المتعثرين
};

// 🧾 Question 1 ONLY (with scoring)
const questions = [
  {
    title: "هل أنت",
    options: [
      {
        text: "موظف أو موظف متعثر لاستكمال دراسة أو مرافق زوج/ة",
        score: { comfortable: 3, debt: 3, struggling: 1 }
      },
      {
        text: "متقاعد أو مقبل على التقاعد",
        score: { comfortable: 3, debt: 0, struggling: 3 }
      },
      {
        text: "عاطل عن العمل - ربة منزل",
        score: { comfortable: 4, debt: 4, struggling: 0 }
      },
      {
        text: "طالب",
        score: { comfortable: 3, debt: 3, struggling: 0 }
      },
      {
        text: "موظف جديد - حديث التعيين",
        score: { comfortable: 3, debt: 3, struggling: 1 }
      }
    ]
  }
];

// 🚀 Load question
function loadQuestion() {
  const q = questions[current];

  document.getElementById("question-title").innerText = q.title;

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerText = opt.text;

    btn.onclick = () => selectAnswer(opt.score);

    answersBox.appendChild(btn);
  });
}

// ✅ Handle answer
function selectAnswer(scoreObj) {
  // add scores
  scores.comfortable += scoreObj.comfortable;
  scores.debt += scoreObj.debt;
  scores.struggling += scoreObj.struggling;

  finishQuiz();
}

// 🏁 Determine result
function finishQuiz() {
  let result;

  if (scores.comfortable >= scores.debt && scores.comfortable >= scores.struggling) {
    result = "باقة المرتاحين";
  } else if (scores.debt >= scores.struggling) {
    result = "باقة المديونين";
  } else {
    result = "باقة المتعثرين";
  }

  document.querySelector(".quiz-container").innerHTML = `
    <h2>نتيجتك:</h2>
    <h3>${result}</h3>
    <a href="booking.html" class="start-btn">احجز الآن</a>
  `;
}

// Start
loadQuestion();
