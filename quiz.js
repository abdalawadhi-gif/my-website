// 🧠 Category scores
let scores = {
  comfortable: 0,
  debt: 0,
  struggling: 0
};

// 🧾 Question 1
const question = {
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
};

// 🚀 Load question
function loadQuestion() {
  document.getElementById("question-title").innerText = question.title;

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  question.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.innerText = opt.text;

    btn.onclick = () => selectAnswer(opt.score);

    answersBox.appendChild(btn);
  });
}

// ✅ Handle answer
function selectAnswer(scoreObj) {
  scores.comfortable += scoreObj.comfortable;
  scores.debt += scoreObj.debt;
  scores.struggling += scoreObj.struggling;

  finishQuiz();
}

// 🎯 Determine result
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

  // 🟢 Comfortable
  if (type === "comfortable") {
    content = `
    <h2>نوع الباقة التي تناسبك هي: باقة المرتاحين</h2>
    <p>انت تحتاج استشارة فردية لتطوير وضعك المالي</p>

    <h3>السعر:</h3>
    <p>199 دك أو 49.750 / 4 دفعات</p>

    <a href="https://wa.me/96522260820?text=مرحبا، خلصت الاستبيان وطلعت نتيجتي باقة المرتاحين وأبي أحجز استشارة" class="start-btn">
      احجز عبر واتساب
    </a>
    `;
  }

  // 🔴 Debt
  if (type === "debt") {
    content = `
    <h2>نوع الباقة التي تناسبك هي: باقة المديونين</h2>
    <p>هذه الباقة تساعدك تسيطر على ديونك</p>

    <a href="https://wa.me/96522260820?text=مرحبا، خلصت الاستبيان وطلعت نتيجتي باقة المديونين وأبي أبدأ العلاج المالي" class="start-btn">
      احجز عبر واتساب
    </a>
    `;
  }

  // 🟡 Struggling
  if (type === "struggling") {
    content = `
    <h2>نوع الباقة التي تناسبك هي: باقة المتعثرين</h2>
    <p>هذه الباقة لإعادة بناء وضعك المالي</p>

    <a href="https://wa.me/96522260820?text=مرحبا، خلصت الاستبيان وطلعت نتيجتي باقة المتعثرين وأحتاج مساعدة عاجلة" class="start-btn">
      احجز عبر واتساب
    </a>
    `;
  }

  document.querySelector(".quiz-container").innerHTML = content;
}

// Start
loadQuestion();
