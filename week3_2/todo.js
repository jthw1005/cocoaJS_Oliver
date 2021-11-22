const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

function handleDeleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
}

function handleToDoChecked(event) {
  const span = event.target.nextElementSibling;
  span.classList.toggle("todo_checked");
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.className = "todo_list";
  toDoList.appendChild(li);

  const input = document.createElement("input");
  input.type = "checkbox";
  li.appendChild(input);
  input.addEventListener("click", handleToDoChecked);

  const span = document.createElement("span");
  span.innerText = newTodo;
  li.appendChild(span);

  const button = document.createElement("button");
  button.innerText = "❌";
  li.appendChild(button);
  button.addEventListener("click", handleDeleteToDo);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  paintToDo(newTodo);
}

toDoForm.addEventListener("submit", handleToDoSubmit);
