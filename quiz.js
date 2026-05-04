// 🧠 Category scores
let scores = {
  comfortable: 0,
  debt: 0,
  struggling: 0
};

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
  if (scoreObj) {
    scores.comfortable += scoreObj.comfortable;
    scores.debt += scoreObj.debt;
    scores.struggling += scoreObj.struggling;
  }

  current++;

  if (current < questions.length) {
    loadQuestion();
  } else {
    finishQuiz();
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

// 📄 PROFESSIONAL RESULT PAGE
function showResult(type) {
  let content = "";

  // 🟢 المرتاحين
  if (type === "comfortable") {
    content = `
    <h2>💎 باقة المرتاحين</h2>
    <p class="highlight">هذه الباقة مناسبة لك لأنك مستقر مالياً وتحتاج تطوير ذكي</p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>
      <ul>
        <li>وضعك المالي مستقر</li>
        <li>لا تعاني من ديون</li>
        <li>تريد تطوير ثروتك</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>
      <ul>
        <li>تنظيم كامل للميزانية</li>
        <li>استراتيجيات إدارة الأصول</li>
        <li>تنويع مصادر الدخل</li>
      </ul>
    </div>

    <div class="section">
      <h3>💰 السعر</h3>
      <p class="price">199 دك أو 49.750 / 4 دفعات</p>
    </div>

    <a href="https://wa.me/96522260820?text=أبي أحجز باقة المرتاحين" class="start-btn">
      احجز الآن عبر واتساب
    </a>
    `;
  }

  // 🔴 المديونين
  if (type === "debt") {
    content = `
    <h2>🚨 باقة المديونين</h2>
    <p class="highlight">هذه الباقة تساعدك تسيطر على ديونك وتستعيد راحتك</p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>
      <ul>
        <li>عندك قروض أو أقساط</li>
        <li>تشعر بضغط مالي</li>
        <li>تريد تنظيم حياتك</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>
      <ul>
        <li>خطة إدارة ديون</li>
        <li>تنظيم المصاريف</li>
        <li>تحقيق راحة مالية</li>
      </ul>
    </div>

    <a href="https://wa.me/96522260820?text=أبي أحجز باقة المديونين" class="start-btn">
      احجز الآن عبر واتساب
    </a>
    `;
  }

  // 🟡 المتعثرين
  if (type === "struggling") {
    content = `
    <h2>🔥 باقة المتعثرين</h2>
    <p class="highlight">هذه الباقة تعيد بناء وضعك المالي من الصفر</p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>
      <ul>
        <li>ضغط مالي شديد</li>
        <li>راتبك يختفي بسرعة</li>
        <li>تشعر بعدم السيطرة</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>
      <ul>
        <li>تشخيص كامل للوضع</li>
        <li>خطة علاج مالي</li>
        <li>إعادة تنظيم حياتك المالية</li>
      </ul>
    </div>

    <a href="https://wa.me/96522260820?text=أبي أحجز باقة المتعثرين" class="start-btn">
      احجز الآن عبر واتساب
    </a>
    `;
  }

  document.querySelector(".quiz-container").innerHTML = content;
}

// Start
loadQuestion();
