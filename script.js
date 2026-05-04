let lang = localStorage.getItem("lang") || "en";

let score = 0;

const content = {
  en: {
    title: "Welcome to Our Clinic",
    subtitle: "Take a quick health quiz",
    start: "Start Quiz",
    quizTitle: "Health Quiz",
    resultGood: "You are doing great! Keep it up 💪",
    resultMid: "You need some improvement ⚠️",
    resultBad: "You need to take action 🚨",
    book: "Book Appointment",
    questions: [
      {
        q: "How often do you exercise?",
        a: [
          { text: "Daily", score: 2 },
          { text: "Sometimes", score: 1 },
          { text: "Never", score: 0 }
        ]
      },
      {
        q: "How much water do you drink?",
        a: [
          { text: "Enough", score: 2 },
          { text: "Not enough", score: 1 },
          { text: "Very little", score: 0 }
        ]
      }
    ]
  },
  ar: {
    title: "مرحباً بكم في عيادتنا",
    subtitle: "خذ اختبار صحي سريع",
    start: "ابدأ الاختبار",
    quizTitle: "الاختبار الصحي",
    resultGood: "وضعك ممتاز 👌",
    resultMid: "تحتاج تحسين ⚠️",
    resultBad: "تحتاج تدخل 🚨",
    book: "احجز موعد",
    questions: [
      {
        q: "كم مرة تمارس الرياضة؟",
        a: [
          { text: "يومياً", score: 2 },
          { text: "أحياناً", score: 1 },
          { text: "أبداً", score: 0 }
        ]
      },
      {
        q: "كم تشرب ماء؟",
        a: [
          { text: "كمية كافية", score: 2 },
          { text: "غير كافية", score: 1 },
          { text: "قليل جداً", score: 0 }
        ]
      }
    ]
  }
};

function setLang(selected) {
  localStorage.setItem("lang", selected);
  location.reload();
}

function applyText() {
  if (document.getElementById("quizTitle")) {
    document.getElementById("quizTitle").innerText = content[lang].quizTitle;
  }
}

let current = 0;

function loadQuestion() {
  const q = content[lang].questions[current];
  document.getElementById("question").innerText = q.q;

  const answersBox = document.getElementById("answers");
  answersBox.innerHTML = "";

  q.a.forEach(ans => {
    const btn = document.createElement("button");
    btn.innerText = ans.text;
    btn.className = "answer-btn";
    btn.onclick = () => selectAnswer(ans.score);
    answersBox.appendChild(btn);
  });
}

function selectAnswer(value) {
  score += value;
  current++;

  if (current < content[lang].questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let resultText;

  if (score >= 3) resultText = content[lang].resultGood;
  else if (score >= 2) resultText = content[lang].resultMid;
  else resultText = content[lang].resultBad;

  document.getElementById("quiz-box").innerHTML = `
    <h3>${resultText}</h3>
    <a href="booking.html" class="btn">${content[lang].book}</a>
  `;
}

applyText();

if (document.getElementById("question")) {
  loadQuestion();
}
window.open(`https://wa.me/965XXXXXXXX?text=New booking from ${name}`);
