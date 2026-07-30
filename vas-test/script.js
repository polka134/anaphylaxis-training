"use strict";

const RESULTS_ENDPOINT = "PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
const STORAGE_KEY = "vas134-progress-v1";
const QUESTIONS = window.VAS_QUESTIONS || [];

const $ = (selector) => document.querySelector(selector);
const screens = {
  start: $("#start-screen"),
  quiz: $("#quiz-screen"),
  loading: $("#loading-screen"),
  result: $("#result-screen"),
};

let state = {
  index: 0,
  answers: [],
  startedAt: 0,
  completed: false,
  fullName: "",
  department: "",
  specialty: "",
};

function showScreen(name) {
  Object.entries(screens).forEach(([key, node]) => node.classList.toggle("hidden", key !== name));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearPersisted() {
  localStorage.removeItem(STORAGE_KEY);
}

function renderQuestion() {
  const item = QUESTIONS[state.index];
  const number = state.index + 1;
  const progress = Math.round((number / QUESTIONS.length) * 100);

  $("#question-counter").textContent = `Вопрос ${number} из ${QUESTIONS.length}`;
  $("#progress-value").textContent = `${progress}%`;
  $("#progress-bar").style.width = `${progress}%`;
  $(".progress").setAttribute("aria-valuenow", String(progress));
  $("#question-type").textContent = item.type;
  $("#question-text").textContent = item.text;

  const answersNode = $("#answers");
  answersNode.replaceChildren();

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(1040 + index)}</span><span>${option}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    answersNode.append(button);
  });

  $("#feedback").className = "feedback hidden";
  $("#feedback").textContent = "";
  $("#next-button").classList.add("hidden");

  const existing = state.answers[state.index];
  if (Number.isInteger(existing)) revealAnswer(existing);
}

function selectAnswer(index) {
  if (Number.isInteger(state.answers[state.index])) return;
  state.answers[state.index] = index;
  persist();
  revealAnswer(index);
}

function revealAnswer(selectedIndex) {
  const item = QUESTIONS[state.index];
  const buttons = [...document.querySelectorAll(".answer")];
  const correct = selectedIndex === item.correct;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("incorrect");
  });

  const feedback = $("#feedback");
  feedback.className = "feedback";
  feedback.innerHTML = `<strong>${correct ? "Верно" : "Неверно"}</strong>${item.explanation}`;

  const next = $("#next-button");
  next.textContent = state.index === QUESTIONS.length - 1 ? "Завершить тест" : "Следующий вопрос";
  next.classList.remove("hidden");
}

$("#start-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = $("#full-name").value.trim();
  const department = $("#department").value.trim();
  const specialty = $("#specialty").value.trim();

  if (!fullName || !department || !specialty) {
    $("#form-error").textContent = "Заполните все поля.";
    return;
  }

  state = {
    index: 0,
    answers: [],
    startedAt: Date.now(),
    completed: false,
    fullName,
    department,
    specialty,
  };

  persist();
  renderQuestion();
  showScreen("quiz");
});

$("#next-button").addEventListener("click", () => {
  if (!Number.isInteger(state.answers[state.index])) return;

  if (state.index < QUESTIONS.length - 1) {
    state.index += 1;
    persist();
    renderQuestion();
  } else {
    finishTest();
  }
});

async function finishTest() {
  showScreen("loading");

  const theoryItems = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.category === "theory");
  const practiceItems = QUESTIONS.map((q, i) => ({ q, i })).filter(({ q }) => q.category === "practice");

  const theoryScore = theoryItems.filter(({ q, i }) => state.answers[i] === q.correct).length;
  const practiceScore = practiceItems.filter(({ q, i }) => state.answers[i] === q.correct).length;
  const totalScore = theoryScore + practiceScore;
  const percent = Math.round((totalScore / QUESTIONS.length) * 100);
  const passed = percent >= 75;
  const wrongQuestions = QUESTIONS
    .map((q, i) => (state.answers[i] === q.correct ? null : i + 1))
    .filter(Boolean);

  const payload = {
    date: new Date().toLocaleDateString("ru-RU"),
    time: new Date().toLocaleTimeString("ru-RU"),
    fullName: state.fullName,
    department: state.department,
    specialty: state.specialty,
    theoryScore,
    practiceScore,
    totalScore,
    totalQuestions: QUESTIONS.length,
    percent,
    status: passed ? "Пройден" : "Не пройден",
    durationSeconds: Math.round((Date.now() - state.startedAt) / 1000),
    wrongQuestions: wrongQuestions.join(", "),
    testName: "Визуальная аналоговая шкала",
  };

  const syncOk = await submitResult(payload);
  await new Promise((resolve) => setTimeout(resolve, 1800));

  $("#result-percent").textContent = `${percent}%`;
  $("#result-ring").style.setProperty("--angle", `${percent * 3.6}deg`);
  $("#result-status").textContent = passed ? "Тест пройден" : "Тест не пройден";
  $("#result-status").style.color = passed ? "var(--success)" : "var(--danger)";
  $("#theory-score").textContent = `${theoryScore} / ${theoryItems.length}`;
  $("#practice-score").textContent = `${practiceScore} / ${practiceItems.length}`;
  $("#result-person").textContent = `${state.fullName} · ${state.department} · ${state.specialty}`;
  $("#result-sync").textContent = syncOk
    ? "Результат сохранён в общей таблице."
    : "Тест завершён, но отправка в Google Таблицу пока не настроена.";

  state.completed = true;
  clearPersisted();
  showScreen("result");
}

async function submitResult(payload) {
  if (!RESULTS_ENDPOINT.startsWith("https://script.google.com/")) return false;

  try {
    await fetch(RESULTS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      keepalive: true,
    });
    return true;
  } catch {
    return false;
  }
}

$("#restart-button").addEventListener("click", () => {
  clearPersisted();
  location.reload();
});

window.addEventListener("beforeunload", (event) => {
  if (state.startedAt && !state.completed && state.answers.length < QUESTIONS.length) {
    event.preventDefault();
    event.returnValue = "";
  }
});

(function restoreProgress() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    const saved = JSON.parse(raw);
    if (!saved.startedAt || saved.completed) {
      clearPersisted();
      return;
    }

    const resume = window.confirm("Найден незавершённый тест. Продолжить прохождение?");
    if (!resume) {
      clearPersisted();
      return;
    }

    state = saved;
    renderQuestion();
    showScreen("quiz");
  } catch {
    clearPersisted();
  }
})();
