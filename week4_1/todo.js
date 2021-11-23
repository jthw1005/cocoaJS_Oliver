const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");
const clock = document.querySelector("h3#clock");
const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function handleDeleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveToDos();
}

function handleToDoChecked(event) {
  const span = event.target.nextElementSibling;
  const li = span.parentElement;
  toDos.forEach((todo) => {
    if (todo.id === parseInt(li.id)) {
      if (!todo.checked) {
        todo.checked = true;
        span.classList.add("todo_checked");
      } else {
        todo.checked = false;
        span.classList.remove("todo_checked");
      }
    }
  });
  saveToDos();
}

function handleToDoMouseEnter(event) {
  event.target.classList.remove("mouseleave");
  event.target.classList.add("mouseenter");
}

function handleToDoMouseLeave(event) {
  event.target.classList.remove("mouseenter");
  event.target.classList.add("mouseleave");
}

function handleToDoFocusIn(event) {
  event.target.classList.add("todo_focusin");
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
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

function rendorToDo(newToDoObj) {
  const li = document.createElement("li");
  li.id = newToDoObj.id;
  li.className = "todo_list";
  toDoList.appendChild(li);

  const input = document.createElement("input");
  input.type = "checkbox";
  li.appendChild(input);
  input.addEventListener("click", handleToDoChecked);

  const span = document.createElement("span");
  span.innerText = newToDoObj.text;
  span.contentEditable = true;
  li.appendChild(span);
  span.addEventListener("mouseenter", handleToDoMouseEnter);
  span.addEventListener("mouseleave", handleToDoMouseLeave);
  span.addEventListener("focusin", handleToDoFocusIn);
  span.addEventListener("focusout", handleToDoFocusOut);

  if (newToDoObj.checked) {
    input.checked = "true";
    span.classList.add("todo_checked");
  }

  const button = document.createElement("button");
  button.innerText = "❌";
  li.appendChild(button);
  button.addEventListener("click", handleDeleteToDo);
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

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
