const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const clock = document.querySelector("h3#clock");
const TODOS_KEY = "todos";

// 모든 투두 리스트 저장할 배열
let toDos = [];
let toDosDone = [];

// 로컬에 투두 리스트 저장하는 함수
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// delete 버튼 눌린 후 핸들링하는 함수
function handleDeleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

// 체크 버튼 눌린 후 핸들링하는 함수
function handleToDoChecked(event) {
  const span = event.target.nextElementSibling;
  const li = span.parentElement;
  toDos.forEach((toDo) => {
    if (toDo.id === parseInt(li.id)) {
      if (!toDo.checked) {
        // view에서는 로컬 스토리지로부터 받은 데이터를 통해 체크 여부를 판단해야 하므로
        // 로컬 스토리지에 있는 투두 리스트의 속성(checked)을 toggle해줘야 한다.
        toDo.checked = true;
        span.classList.add("todo_checked");
      } else {
        toDo.checked = false;
        span.classList.remove("todo_checked");
      }
    }
  });
  saveToDos();
}

// 리스트 클릭했을 때 핸들하는 함수
function handleToDoFocusIn(event) {
  event.target.classList.add("todo_focusin");
}

// 리스트 클릭 풀었을 때 핸들하는 함수
function handleToDoFocusOut(event) {
  event.target.classList.remove("todo_focusin");
  event.target.classList.add("todo_focusout");
  const li = event.target.parentElement;
  const span = event.target;
  console.log(span.innerText);
  toDos.forEach((todo) => {
    if (todo.id === parseInt(li.id)) todo.text = span.innerText;
  });
  saveToDos();
}

// element 생성해서 화면에 렌더해주는 함수
function rendorToDo(newToDoObj) {
  // li 엘리먼트 생성
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  li.className = "todo_list";
  toDoList.appendChild(li);

  // input 엘리먼트 생성
  const input = document.createElement("input");
  input.type = "checkbox";
  li.appendChild(input);
  input.addEventListener("click", handleToDoChecked);
  if (newToDoObj.checked) {
    input.checked = "true";
  }

  // span 엘리먼트 생성
  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  span.contentEditable = true;
  li.appendChild(span);
  span.addEventListener("focusin", handleToDoFocusIn);
  span.addEventListener("focusout", handleToDoFocusOut);
  if (newToDoObj.checked) {
    span.classList.add("todo_checked");
  }

  // btn 엘리먼트 생성
  const button = document.createElement("button");
  button.innerText = "❌";
  li.appendChild(button);
  button.addEventListener("click", handleDeleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newToDo = toDoInput.value;
  toDoInput.value = "";
  const newToDoObj = {
    text: newToDo,
    id: Date.now(),
    checked: false,
  };
  toDos.push(newToDoObj);
  rendorToDo(newToDoObj);
  saveToDos();
}

// function getClock() {
//   const date = new Date();
//   const hours = String(date.getHours()).padStart(2, "0");
//   const minutes = String(date.getMinutes()).padStart(2, "0");
//   const seconds = String(date.getSeconds()).padStart(2, "0");
//   clock.innerText = `${hours}:${minutes}:${seconds}`;
// }
// getClock();
// setInterval(getClock, 1000);

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(rendorToDo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);
