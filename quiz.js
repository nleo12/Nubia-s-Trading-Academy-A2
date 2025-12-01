/* quiz.js
   LegacyTrades Skill Check grading logic
*/
const ANSWERS = {
  q1: "momentum",
  q2: "B",
  q3: "B",
  q4: "B",
  q5: ["position", "stop", "journal"]
};
const PASS_PERCENT = 100;
document.addEventListener("DOMContentLoaded", function () {
  const submitBtn = document.getElementById("submit-btn");
  const resetBtn  = document.getElementById("reset-btn");
  const resultsEl = document.getElementById("results");
  const form = document.getElementById("quiz-form");
  function badge(text, color) {
    const span = document.createElement("span");
    span.textContent = text;
    span.style.padding = "0.2rem 0.5rem";
    span.style.borderRadius = "6px";
    span.style.fontWeight = "700";
    span.style.marginLeft = "0.5rem";
    span.style.color = "#111";
    span.style.background = color;
    return span;
  }
  function gradeQuiz() {
    resultsEl.innerHTML = "";
    let score = 0;
    const total = 5;
    const q1input = (document.getElementById("q1").value || "").trim();
    const q1Correct = q1input.toLowerCase() === ANSWERS.q1.toLowerCase();
    if (q1Correct) score++;
    const q1div = document.createElement("div");
    q1div.innerHTML = `<strong>Q1 — Fill-in-the-blank</strong>`;
    q1div.appendChild(q1Correct ? badge("Correct", "#7CE39A") : badge("Incorrect", "#FF9B9B"));
    q1div.innerHTML += `<div class="small">Your answer: ${q1input || "<em>(no answer)</em>"}</div>`;
    q1div.innerHTML += `<div class="small">Correct answer: <strong>${ANSWERS.q1}</strong></div>`;
    resultsEl.appendChild(q1div);
    function gradeRadio(qname, text) {
      const radios = document.getElementsByName(qname);
      let selected = null;
      radios.forEach && radios.forEach(r => { if (r.checked) selected = r.value; });
      if (!radios.forEach) {
        for (let r = 0; r < radios.length; r++) if (radios[r].checked) selected = radios[r].value;
      }
      const correct = (selected === ANSWERS[qname]);
      if (correct) score++;
      const div = document.createElement("div");
      div.innerHTML = `<strong>${text}</strong>`;
      div.appendChild(correct ? badge("Correct", "#7CE39A") : badge("Incorrect", "#FF9B9B"));
      div.innerHTML += `<div class="small">Your answer: ${selected || "<em>(no answer)</em>"}</div>`;
      const map = {
        q2: { A: "SMA", B: "EMA (correct)", C: "HMA", D: "TMA" },
        q3: { A: "Hammer", B: "Shooting Star (correct)", C: "Doji", D: "Bullish Engulfing" },
        q4: { A: "5%", B: "1% (correct)", C: "10%", D: "0.01%" }
      };
      div.innerHTML += `<div class="small">Correct answer: <strong>${map[qname][ANSWERS[qname]] || ANSWERS[qname]}</strong></div>`;
      resultsEl.appendChild(div);
    }
    gradeRadio("q2", "Q2 — Which moving average gives more weight to recent prices?");
    gradeRadio("q3", "Q3 — Which candlestick is commonly considered a bearish reversal at the top of an uptrend?");
    gradeRadio("q4", "Q4 — Typical conservative risk-per-trade recommendation?");
    const q5Nodes = document.querySelectorAll('input[name="q5"]:checked');
    const selectedQ5 = Array.from(q5Nodes).map(n => n.value).sort();
    const correctQ5 = ANSWERS.q5.slice().sort();
    const q5Correct = JSON.stringify(selectedQ5) === JSON.stringify(correctQ5);
    if (q5Correct) score++;
    const q5div = document.createElement("div");
    q5div.innerHTML = `<strong>Q5 — Multi-selection</strong>`;
    q5div.appendChild(q5Correct ? badge("Correct", "#7CE39A") : badge("Incorrect", "#FF9B9B"));
    q5div.innerHTML += `<div class="small">Your choices: ${selectedQ5.length ? selectedQ5.join(", ") : "<em>(none)</em>"}</div>`;
    q5div.innerHTML += `<div class="small">Correct choices: <strong>${correctQ5.join(", ")}</strong></div>`;
    resultsEl.appendChild(q5div);
    const percent = Math.round((score / total) * 100);
    const passed = percent >= PASS_PERCENT;
    const overall = document.createElement("div");
    overall.style.marginTop = "1rem";
    overall.style.padding = "0.75rem";
    overall.style.borderRadius = "8px";
    overall.style.border = "1px solid rgba(255,255,255,0.03)";
    overall.innerHTML = `<strong>Overall result</strong>`;
    overall.appendChild(passed ? badge("PASS", "#7CE39A") : badge("FAIL", "#FF9B9B"));
    overall.innerHTML += `<div style="margin-top:0.4rem;">Score: <strong>${score} / ${total}</strong> (${percent}%)</div>`;
    const scoreSpan = document.createElement("div");
    scoreSpan.style.marginTop = "0.4rem";
    scoreSpan.textContent = passed ? "You think like a disciplined trader!" : "You still trade emotionally- study harder.";
    overall.appendChild(scoreSpan);
    resultsEl.appendChild(overall);
    overall.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function resetQuiz() {
    form.reset();
    resultsEl.innerHTML = "";
    document.activeElement && document.activeElement.blur && document.activeElement.blur();
  }
  submitBtn.addEventListener("click", gradeQuiz);
  resetBtn.addEventListener("click", resetQuiz);
});
