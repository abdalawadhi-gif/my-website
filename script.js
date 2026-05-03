let lang = localStorage.getItem("lang") || "en";

const content = {
  en: {
    title: "Welcome to Our Clinic",
    subtitle: "Take a quick health quiz",
    start: "Start Quiz",
    quizTitle: "Health Quiz",
    questions: [
      {
        q: "How often do you exercise?",
        a: ["Daily", "Sometimes", "Never"]
      },
      {
        q: "How much water do you drink?",
        a: ["Enough", "Not enough", "Very little"]
      }
    ]
  },
  ar: {
    title: "مرحباً بكم في عيادتنا",
    subtitle: "خذ اختبار صحي سريع",
    start: "ابدأ الاختبار",
    quizTitle: "الاختبار الصحي",
    questions: [
      {
        q: "كم مرة تمارس الرياضة؟",
        a: ["يومياً", "أحياناً", "أبداً"]
      },
      {
        q: "كم تشرب ماء؟",
        a: ["كمية كافية", "غير كافية", "قليل جداً"]
      }
    ]
  }
};

function setLang(selected) {
  localStorage.setItem("lang", selected);
  location.reload();
}

function applyText() {
  if (document.getElementById("title")) {
    document.getElementById("title").innerText = content[lang].title;
    document.getElementById("subtitle").innerText = content[lang].subtitle;
    document.getElementById("startBtn").innerText = content[lang].start;
  }

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
    btn.innerText = ans;
    btn.className = "answer-btn";
    btn.onclick = () => nextQuestion();
    answersBox.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < content[lang].questions.length) {
    loadQuestion();
  } else {
    document.getElementById("quiz-box").innerHTML =
      "<h3>" + (lang === "ar" ? "شكراً لك!" : "Thank you!") + "</h3>";
  }
}

applyText();

if (document.getElementById("question")) {
  loadQuestion();
}
