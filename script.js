"use strict";

const QUESTIONS = [
  {type:"Базовые действия",text:"Какой препарат является препаратом первой линии при анафилаксии?",options:["Преднизолон","Эпинефрин (адреналин)","Хлоропирамин","Дексаметазон"],correct:1,explanation:"Эпинефрин (адреналин) вводят без промедления. Антигистаминные препараты и глюкокортикостероиды не заменяют препарат первой линии."},
  {type:"Лекарственная помощь",text:"Каков предпочтительный путь первичного введения эпинефрина при анафилаксии?",options:["Подкожно","Внутримышечно","Внутривенно струйно всем пациентам","Внутрикожно"],correct:1,explanation:"Предпочтительно внутримышечное введение. Внутривенное введение требует специальной подготовки и мониторинга и не является рутинным первым шагом."},
  {type:"Лекарственная помощь",text:"Куда предпочтительно вводить эпинефрин внутримышечно?",options:["В переднебоковую поверхность средней трети бедра","В ягодичную мышцу","В переднюю брюшную стенку","В предплечье"],correct:0,explanation:"Рекомендуемое место — переднебоковая поверхность средней трети бедра: здесь обеспечивается быстрое и надёжное всасывание."},
  {type:"Дозирование",text:"Какова стандартная разовая доза эпинефрина для взрослого при внутримышечном введении раствора 1 мг/мл?",options:["0,05 мл (0,05 мг)","0,1 мл (0,1 мг)","0,5 мл (0,5 мг)","1 мл (1 мг)"],correct:2,explanation:"Для взрослого стандартная разовая доза — 0,5 мг, то есть 0,5 мл раствора 1 мг/мл. Всегда проверяйте концентрацию на ампуле."},
  {type:"Повторная оценка",text:"Когда следует повторить внутримышечное введение эпинефрина, если сохраняются угрожающие симптомы?",options:["Не ранее чем через 30 минут","Примерно через 5 минут с повторной оценкой состояния","Только после введения антигистаминного препарата","Повторное введение противопоказано"],correct:1,explanation:"При сохраняющихся проблемах с дыхательными путями, дыханием или кровообращением дозу повторяют примерно через 5 минут, оценивая состояние пациента."},
  {type:"Ситуационная задача",text:"Во время введения антибиотика пациент пожаловался на зуд, одышку и головокружение. АД 75/40 мм рт. ст. Какое действие необходимо выполнить немедленно?",options:["Завершить введение препарата","Прекратить поступление предполагаемого аллергена и начать алгоритм неотложной помощи","Дать пациенту воды","Оставить пациента одного и искать историю болезни"],correct:1,explanation:"Прекратите введение предполагаемого аллергена, позовите помощь и немедленно начинайте оказание неотложной помощи, не ожидая полного набора симптомов."},
  {type:"Положение пациента",text:"Как уложить пациента с анафилаксией и выраженной гипотонией, если нет тяжёлой дыхательной недостаточности?",options:["Посадить и попросить встать при улучшении","Уложить на спину с приподнятыми ногами","Положить на живот","Разрешить ходить по кабинету"],correct:1,explanation:"Положение лёжа с приподнятыми ногами поддерживает венозный возврат. Не позволяйте пациенту внезапно садиться или вставать."},
  {type:"Распознавание",text:"Какое утверждение о кожных проявлениях анафилаксии верно?",options:["Без крапивницы анафилаксия исключена","Кожные проявления обязательны только у взрослых","Отсутствие кожных проявлений не исключает анафилаксию","Сыпь всегда появляется раньше нарушения дыхания"],correct:2,explanation:"Анафилаксия может протекать без крапивницы и других кожных проявлений. Ориентируйтесь на быстрое развитие угрожающих нарушений дыхания или кровообращения."},
  {type:"Поддерживающая помощь",text:"Что входит в первичную поддерживающую помощь после введения эпинефрина?",options:["Кислород, мониторинг, обеспечение венозного доступа и инфузия кристаллоидов по показаниям","Только измерение температуры","Приём пищи и жидкости внутрь","Ожидание врача без дальнейших действий"],correct:0,explanation:"Продолжайте оценку ABCDE: кислород при наличии показаний, мониторинг, венозный доступ и быстрая инфузия кристаллоидов при гипотонии."},
  {type:"Препараты второй линии",text:"Какова роль антигистаминных препаратов при анафилаксии?",options:["Они заменяют эпинефрин","Их дают до эпинефрина при гипотонии","Они могут уменьшить кожные симптомы, но не лечат нарушения дыхания и кровообращения","Они предотвращают все двухфазные реакции"],correct:2,explanation:"Антигистаминные препараты — не средство спасения при шоке или обструкции дыхательных путей. Их рассматривают только после стабилизации угрожающих функций."},
  {type:"Мониторинг",text:"Какие показатели необходимо регулярно контролировать во время оказания помощи?",options:["Только температуру","АД, пульс, частоту дыхания, сатурацию и уровень сознания","Только частоту пульса","Рост и массу тела"],correct:1,explanation:"Регулярно оценивайте дыхательные пути, дыхание, кровообращение и сознание, фиксируя АД, пульс, частоту дыхания и SpO₂."},
  {type:"После стабилизации",text:"Какова правильная тактика после улучшения состояния?",options:["Отпустить пациента домой сразу после исчезновения сыпи","Продолжить медицинское наблюдение и организовать госпитализацию/транспортировку по действующему алгоритму","Разрешить пациенту самостоятельно ехать домой","Завершить наблюдение через 10 минут"],correct:1,explanation:"После анафилаксии требуется медицинское наблюдение из-за риска рецидива; дальнейшую маршрутизацию проводят по клиническим рекомендациям и локальному алгоритму."}
];

const $ = (selector) => document.querySelector(selector);
const screens = {start:$("#start-screen"),quiz:$("#quiz-screen"),result:$("#result-screen")};
const state = {index:0,score:0,answered:false,fullName:"",department:""};

function showScreen(name){Object.entries(screens).forEach(([key,node])=>node.classList.toggle("hidden",key!==name));window.scrollTo({top:0,behavior:"smooth"});}
function validateField(input,error,message){const valid=input.value.trim().length>1;input.classList.toggle("invalid",!valid);input.setAttribute("aria-invalid",String(!valid));error.textContent=valid?"":message;return valid;}

$("#start-form").addEventListener("submit",event=>{
  event.preventDefault();
  const nameInput=$("#full-name"),departmentInput=$("#department");
  const nameOK=validateField(nameInput,$("#name-error"),"Введите ФИО."),departmentOK=validateField(departmentInput,$("#department-error"),"Введите подразделение.");
  if(!nameOK||!departmentOK){(!nameOK?nameInput:departmentInput).focus();return;}
  state.fullName=nameInput.value.trim();state.department=departmentInput.value.trim();state.index=0;state.score=0;renderQuestion();showScreen("quiz");
});

function renderQuestion(){
  state.answered=false;
  const item=QUESTIONS[state.index],number=state.index+1,progress=Math.round(number/QUESTIONS.length*100);
  $("#question-counter").textContent=`Вопрос ${number} из ${QUESTIONS.length}`;$("#progress-value").textContent=`${progress}%`;$("#progress-bar").style.width=`${progress}%`;
  $(".progress").setAttribute("aria-valuenow",String(progress));$("#question-type").textContent=item.type;$("#question-text").textContent=item.text;
  const answers=$("#answers");answers.replaceChildren();
  item.options.forEach((option,index)=>{const button=document.createElement("button");button.type="button";button.className="answer";button.innerHTML=`<span class="answer-letter">${String.fromCharCode(1040+index)}</span><span>${option}</span>`;button.addEventListener("click",()=>checkAnswer(index));answers.append(button);});
  $("#feedback").className="feedback hidden";$("#feedback").textContent="";$("#next-button").classList.add("hidden");
}

function checkAnswer(selectedIndex){
  if(state.answered)return;state.answered=true;
  const item=QUESTIONS[state.index],buttons=[...document.querySelectorAll(".answer")],isCorrect=selectedIndex===item.correct;
  if(isCorrect)state.score++;
  buttons.forEach((button,index)=>{button.disabled=true;if(index===item.correct)button.classList.add("correct");else if(index===selectedIndex)button.classList.add("incorrect");});
  const feedback=$("#feedback");feedback.className=`feedback ${isCorrect?"correct":"incorrect"}`;feedback.innerHTML=`<strong>${isCorrect?"Верно":"Неверно"}</strong>${item.explanation}`;
  const next=$("#next-button");next.textContent=state.index===QUESTIONS.length-1?"Показать результат":"Следующий вопрос";next.classList.remove("hidden");next.focus();
}

$("#next-button").addEventListener("click",()=>{if(!state.answered)return;if(state.index<QUESTIONS.length-1){state.index++;renderQuestion();}else{renderResult();showScreen("result");}});

function getGrade(percent){if(percent>=90)return{label:"Отлично",color:"#087a55",advice:"Высокий уровень подготовки. Продолжайте регулярно отрабатывать командный алгоритм действий."};if(percent>=75)return{label:"Хорошо",color:"#075ea8",advice:"Хороший результат. Повторите вопросы, в которых были допущены ошибки."};if(percent>=60)return{label:"Удовлетворительно",color:"#a35d00",advice:"Рекомендуется повторить алгоритм распознавания анафилаксии и оказания неотложной помощи."};return{label:"Требуется повторное обучение",color:"#b42318",advice:"Повторите учебный материал и локальный алгоритм учреждения, затем пройдите тест снова."};}
function renderResult(){const percent=Math.round(state.score/QUESTIONS.length*100),grade=getGrade(percent),errors=QUESTIONS.length-state.score,ring=$("#result-ring");$("#result-percent").textContent=`${percent}%`;$("#result-grade").textContent=grade.label;$("#result-grade").style.color=grade.color;$("#result-score").textContent=`${state.score} из ${QUESTIONS.length} правильных · Ошибок: ${errors}`;$("#result-name").textContent=state.fullName;$("#result-department").textContent=state.department;$("#result-advice").textContent=grade.advice;ring.style.setProperty("--score-angle",`${percent*3.6}deg`);ring.style.setProperty("--score-color",grade.color);}
$("#restart-button").addEventListener("click",()=>{$("#start-form").reset();$("#name-error").textContent="";$("#department-error").textContent="";state.index=0;state.score=0;state.answered=false;showScreen("start");$("#full-name").focus();});
