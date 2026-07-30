"use strict";
const $ = (s) => document.querySelector(s);

$("#csv-file").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const text = await file.text();
  const rows = parseCSV(text);
  if (rows.length < 2) return;
  const headers = rows[0].map((x) => x.trim());
  const data = rows.slice(1).filter((r) => r.some(Boolean)).map((row) => Object.fromEntries(headers.map((h, i) => [h, row[i] ?? ""])));
  render(data);
});

function parseCSV(text) {
  const rows = []; let row = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i], n = text[i + 1];
    if (c === '"' && quoted && n === '"') { cell += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if ((c === "," || c === ";") && !quoted) { row.push(cell); cell = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && n === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function pick(obj, names) {
  const key = Object.keys(obj).find((k) => names.includes(k.trim().toLowerCase()));
  return key ? obj[key] : "";
}

function render(data) {
  const percentages = data.map((r) => Number(String(pick(r, ["percent","процент","общий %"])).replace("%","").replace(",","."))).filter(Number.isFinite);
  const durations = data.map((r) => Number(pick(r, ["durationseconds","время (сек)","длительность (сек)"]))).filter(Number.isFinite);

  $("#participants").textContent = data.length;
  $("#average").textContent = percentages.length ? `${Math.round(percentages.reduce((a,b)=>a+b,0)/percentages.length)}%` : "—";
  $("#duration").textContent = durations.length ? `${Math.round(durations.reduce((a,b)=>a+b,0)/durations.length/60)} мин` : "—";

  const counts = new Map();
  data.forEach((r) => String(pick(r, ["wrongquestions","ошибочные вопросы","ошибки"])).split(",").map((x)=>x.trim()).filter(Boolean).forEach((q)=>counts.set(q,(counts.get(q)||0)+1)));
  const hardest = [...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8);
  $("#hardest").innerHTML = hardest.length ? hardest.map(([q,c]) => `<div class="bar-row"><span>Вопрос ${escapeHtml(q)}</span><div class="bar"><i style="width:${Math.round(c/data.length*100)}%"></i></div><strong>${c}</strong></div>`).join("") : '<p class="lead">В CSV нет столбца с ошибочными вопросами.</p>';

  $("#results-body").innerHTML = data.slice(-20).reverse().map((r)=>`<tr><td>${escapeHtml(pick(r,["fullname","фио"]))}</td><td>${escapeHtml(pick(r,["department","подразделение"]))}</td><td>${escapeHtml(pick(r,["percent","процент","общий %"]))}%</td><td>${escapeHtml(pick(r,["status","статус","grade"]))}</td></tr>`).join("");
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
