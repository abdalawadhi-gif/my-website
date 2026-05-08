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
  let resultDescription;

  // 🟢 المرتاحين
  if (
    scores.comfortable >= scores.debt &&
    scores.comfortable >= scores.struggling
  ) {

    result = "💎 باقة المرتاحين";

    resultDescription = `
      هذه الباقة مناسبة لك لأن وضعك المالي مستقر
      وتحتاج تطوير وإدارة ذكية للأصول والميزانية.
    `;

  }

  // 🔴 المديونين
  else if (scores.debt >= scores.struggling) {

    result = "🚨 باقة المديونين";

    resultDescription = `
      تحتاج إلى خطة واضحة لإدارة الديون
      والسيطرة على الالتزامات المالية براحة أكبر.
    `;

  }

  // 🟡 المتعثرين
  else {

    result = "🔥 باقة المتعثرين";

    resultDescription = `
      تحتاج إلى إعادة ترتيب الوضع المالي بالكامل
      وبناء خطة علاج مالي واضحة من الصفر.
    `;

  }

  // 👤 Get User Data
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

  // 📱 WhatsApp Message
  const whatsappMessage = `
مرحباً كاش كلينك 👋

لقد أكملت التشخيص المالي

النتيجة:
${result}

الاسم:
${userData.name}

رقم الواتساب:
${userData.whatsapp}

الدولة:
${userData.country}
`;

  // 📄 Show Result
  document.querySelector(".quiz-container").innerHTML = `

    <h2>${result}</h2>

    <p class="highlight">
      ${resultDescription}
    </p>

    <div class="section">

      <h3>✅ تم تسجيل بياناتك بنجاح</h3>

      <p>
        يمكنك الآن التواصل مع فريق كاش كلينك
        لاستكمال التشخيص والخطة المالية.
      </p>

    </div>

    <a
      href="https://wa.me/96522260820?text=${encodeURIComponent(whatsappMessage)}"
      class="start-btn"
      target="_blank"
    >
      التواصل عبر واتساب
    </a>

  `;
}

// 🚀 Start
loadQuestion();
