const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");


    function deleteToDo(event) {
        const li = event.target.parentElement;
        li.remove();
    }
    
    function strikethroughToDo(event) {
        const span = event.target.parentElement;
        if(span.style.textDecoration === 'line-through')
            span.style.textDecoration='none';
        else
            span.style.textDecoration='line-through';
    }
    
    function paintToDo(newTodo) {
        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "checkbox";
        li.appendChild(input);
        toDoList.appendChild(li);
        
        const span = document.createElement("span");
        span.innerText = newTodo;
        li.appendChild(span);
        input.addEventListener("click", strikethroughToDo);
       
        const button = document.createElement("button");
        button.innerText = "❌";
        li.appendChild(button);
        button.addEventListener("click", deleteToDo);
    }

    function handleToDoSubmit(event) {
        event.preventDefault();
        const newTodo = toDoInput.value;
        toDoInput.value = "";
        paintToDo(newTodo);
    }

toDoForm.addEventListener("submit", handleToDoSubmit);