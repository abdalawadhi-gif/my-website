// 🧠 Category scores (ONLY Q1 affects this)
let scores = {
  comfortable: 0,
  debt: 0,
  struggling: 0
};

// 📊 Track question step
let current = 0;

// 🧾 Questions
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
  },
  {
    title: "ماهي اكثر نقطة تعاني منها؟",
    options: [
      { text: "أفلس بنص الشهر او بداية الشهر", score: null },
      { text: "عندي أقساط وديون", score: null },
      { text: "ضايع، ماعرف شنو اللي أبي", score: null },
      { text: "أبي اطور وضعي المالي", score: null },
      { text: "ما ادري وين تختفي فلوسي", score: null }
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

  // 🧠 ONLY first question affects score
  if (scoreObj) {
    scores.comfortable += scoreObj.comfortable;
    scores.debt += scoreObj.debt;
    scores.struggling += scoreObj.struggling;
  }

  current++;

  if (current < questions.length) {
    loadQuestion(); // 👉 go to next question
  } else {
    finishQuiz(); // 👉 after last question
  }
}

// 🎯 Result
function finishQuiz() {
  let result;

  if (scores.comfortable >= scores.debt && scores.comfortable >= scores.struggling) {
    result = "comfortable";
  } else if (scores.debt >= scores.struggling) {
    result = "debt";
  } else {
    result = "struggling";
  }

  showResult(result);
}

// 📄 Show result
function showResult(type) {
  let content = "";

  if (type === "comfortable") {
    content = `
    <h2>باقة المرتاحين</h2>
    <a href="https://wa.me/96522260820" class="start-btn">احجز الآن</a>
    `;
  }

  if (type === "debt") {
    content = `
    <h2>باقة المديونين</h2>
    <a href="https://wa.me/96522260820" class="start-btn">احجز الآن</a>
    `;
  }

  if (type === "struggling") {
    content = `
    <h2>باقة المتعثرين</h2>
    <a href="https://wa.me/96522260820" class="start-btn">احجز الآن</a>
    `;
  }

  document.querySelector(".quiz-container").innerHTML = content;
}

// Start
loadQuestion();
