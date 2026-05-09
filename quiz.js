import { db, collection, addDoc } from "./firebase.js";

// 🧠 Scores
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
      { text: "موظف أو موظف متعثر لاستكمال دراسة أو مرافق زوج/ة" },
      { text: "متقاعد أو مقبل على التقاعد" },
      { text: "عاطل عن العمل - ربة منزل" },
      { text: "طالب" },
      { text: "موظف جديد - حديث التعيين" }
    ]
  },

  {
    title: "ماهي اكثر نقطة تعاني منها؟",
    options: [
      {
        text: "أفلس بنص الشهر او بداية الشهر",
        result: "struggling"
      },

      {
        text: "عندي أقساط وديون ومضغوط",
        result: "debt"
      },

      {
        text: "ضايع، ماعرف شنو اللي أبي",
        result: "struggling"
      },

      {
        text: "أبي اطور وضعي المالي",
        result: "comfortable"
      },

      {
        text: "ما ادري وين تختفي فلوسي",
        result: "struggling"
      }
    ]
  }
];

// 🚀 Load Question
function loadQuestion() {

  const q = questions[current];

  document.getElementById("question-title").innerText = q.title;

  const answersBox = document.getElementById("answers");

  answersBox.innerHTML = "";

  q.options.forEach(opt => {

    const btn = document.createElement("button");

    btn.className = "answer";

    btn.innerText = opt.text;

    btn.onclick = () => selectAnswer(opt);

    answersBox.appendChild(btn);

  });
}

// ✅ Handle Answer
function selectAnswer(option) {

  // 🎯 Only Q2 affects result
  if (current === 1 && option.result) {

    scores[option.result] += 1;

  }

  current++;

  if (current < questions.length) {

    loadQuestion();

  } else {

    finishQuiz();

  }
}

// 🎯 Finish Quiz
async function finishQuiz() {

  let result;

  // 🟢 المرتاحين
  if (
    scores.comfortable >= scores.debt &&
    scores.comfortable >= scores.struggling
  ) {

    result = "💎 باقة المرتاحين";

  }

  // 🔴 المديونين
  else if (scores.debt >= scores.struggling) {

    result = "🚨 باقة المديونين";

  }

  // 🟡 المتعثرين
  else {

    result = "🔥 باقة المتعثرين";

  }

  // 👤 User Data
  const userData = {

    name: localStorage.getItem("user_name"),

    email: localStorage.getItem("user_email"),

    whatsapp: localStorage.getItem("user_whatsapp"),

    country: localStorage.getItem("user_country"),

    result: result,

    createdAt: new Date()

  };

  // 🔥 Save To Firebase
  try {

    await addDoc(collection(db, "leads"), userData);

    console.log("✅ Lead Saved!");

  } catch (error) {

    console.error("❌ Firebase Error:", error);

  }

  // 📄 Show Result
  showResult(result);
}

// 📄 PROFESSIONAL RESULT PAGE
function showResult(result) {

  let content = "";

  // 🟢 المرتاحين
  if (result.includes("المرتاحين")) {

    content = `

    <h2>💎 باقة المرتاحين</h2>

    <p class="highlight">
      هذه الباقة مناسبة لك لأنك مستقر مالياً وتحتاج تطوير ذكي
    </p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>

      <ul>
        <li>وضعك المالي مستقر</li>
        <li>لا تعاني من ضغط الديون</li>
        <li>تريد حماية وتطوير ثروتك</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>

      <ul>
        <li>تنظيم الميزانية الشخصية</li>
        <li>استراتيجيات إدارة الأصول</li>
        <li>تنويع مصادر الدخل</li>
        <li>تحقيق استقرار مالي طويل المدى</li>
      </ul>
    </div>

    <div class="section">
      <h3>💰 السعر</h3>

      <p class="price">
        199 دك أو 49.750 / 4 دفعات
      </p>
    </div>

    <a
      href="https://wa.me/96522260820?text=مرحباً، خلصت الاستبيان وطلع عندي باقة المرتاحين"
      class="start-btn"
      target="_blank"
    >
      التواصل عبر واتساب
    </a>

    `;
  }

  // 🔴 المديونين
  else if (result.includes("المديونين")) {

    content = `

    <h2>🚨 باقة المديونين</h2>

    <p class="highlight">
      هذه الباقة تساعدك تسيطر على ديونك وتستعيد راحتك
    </p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>

      <ul>
        <li>عندك قروض أو أقساط</li>
        <li>تشعر بضغط مالي</li>
        <li>تريد تنظيم حياتك المالية</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>

      <ul>
        <li>خطة عملية لإدارة الديون</li>
        <li>تنظيم المصروفات</li>
        <li>إدارة التدفق النقدي</li>
        <li>تقليل الضغط المالي</li>
      </ul>
    </div>

    <div class="section">
      <h3>💰 السعر</h3>

      <p class="price">
        تواصل معنا لمعرفة تفاصيل الباقة
      </p>
    </div>

    <a
      href="https://wa.me/96522260820?text=مرحباً، خلصت الاستبيان وطلع عندي باقة المديونين"
      class="start-btn"
      target="_blank"
    >
      التواصل عبر واتساب
    </a>

    `;
  }

  // 🟡 المتعثرين
  else {

    content = `

    <h2>🔥 باقة المتعثرين</h2>

    <p class="highlight">
      هذه الباقة تعيد بناء وضعك المالي من الصفر
    </p>

    <div class="section">
      <h3>🎯 لمن هذه الباقة؟</h3>

      <ul>
        <li>تعاني من ضغط مالي شديد</li>
        <li>راتبك يختفي بسرعة</li>
        <li>تشعر بعدم السيطرة على أموالك</li>
      </ul>
    </div>

    <div class="section">
      <h3>🚀 ماذا ستحصل؟</h3>

      <ul>
        <li>تشخيص كامل للوضع المالي</li>
        <li>خطة علاج مالي واضحة</li>
        <li>إعادة ترتيب الالتزامات</li>
        <li>خطة سداد وتنظيم راتب</li>
      </ul>
    </div>

    <div class="section">
      <h3>💰 السعر</h3>

      <p class="price">
        تواصل معنا لمعرفة تفاصيل الباقة
      </p>
    </div>

    <a
      href="https://wa.me/96522260820?text=مرحباً، خلصت الاستبيان وطلع عندي باقة المتعثرين"
      class="start-btn"
      target="_blank"
    >
      التواصل عبر واتساب
    </a>

    `;
  }

  document.querySelector(".quiz-container").innerHTML = content;
}

// 🚀 Start
loadQuestion();
