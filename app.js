//Get elements from DOM
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

const addTodo = () => {
    if (todoInput.value) {
        const todoItem = document.createElement("li");
        todoItem.classList = "todo-item flex-space-between";

        const todoText = document.createElement("p");
        todoText.innerHTML = todoInput.value;
        todoText.className = "todo-text";

        const todoActBtns = document.createElement("div");
        todoActBtns.className = "todo-act-bnts";

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList = "trash act-btn";
        deleteItem(trashBtn);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList = "check act-btn";
        completeItem(checkBtn);

        //Appending Elements
        todoActBtns.appendChild(checkBtn);
        todoActBtns.appendChild(trashBtn);

        todoItem.appendChild(todoText);
        todoItem.appendChild(todoActBtns);

        todoList.appendChild(todoItem);

        saveTodos(todoInput.value);
    } else {
        const errorMessage = document.querySelector(".error-message");
        errorMessage.classList.add("active");

        const duration = setInterval(() => {
            errorMessage.classList.remove("active");
            clearInterval(duration);
        }, 2000);

    }
};

//Add Items into DOM
todoForm.addEventListener("submit", (e) => {
    //Prevent Reloading
    e.preventDefault();

    addTodo();

    //Reset Input
    todoInput.value = "";
});

//Complete Item
const completeItem = (checkBtn) => {
    checkBtn.addEventListener("click", (e) => {
        const todoItem = e.target.parentElement.parentElement;

        todoItem.classList.toggle("complete");
    });
};

//Delete Item
const deleteItem = (trashBtn) => {
    trashBtn.addEventListener("click", (e) => {
        const todoItem = e.target.parentElement.parentElement;

        todoItem.classList.add("delete");

        todoItem.addEventListener("transitionend", () => {
            todoItem.remove();
        });

        removeLocalTodo(todoItem);
    });
};

//LocalStorage
const saveTodos = (todo) => {
    let todos;
    localStorage.getItem("todos") ? (todos = JSON.parse(localStorage.getItem("todos"))) : (todos = []);
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeLocalTodo = (todo) => {
    let todos;
    localStorage.getItem("todos") ? (todos = JSON.parse(localStorage.getItem("todos"))) : (todos = []);

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const initTodos = () => {
    let todos;
    localStorage.getItem("todos") ? (todos = JSON.parse(localStorage.getItem("todos"))) : (todos = []);

    todos.forEach((item) => {
        const todoItem = document.createElement("li");
        todoItem.classList = "todo-item flex-space-between";

        const todoText = document.createElement("p");
        todoText.innerHTML = item;
        todoText.className = "todo-text";

        const todoActBtns = document.createElement("div");
        todoActBtns.className = "todo-act-bnts";

        const trashBtn = document.createElement("button");
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList = "trash act-btn";
        deleteItem(trashBtn);

        const checkBtn = document.createElement("button");
        checkBtn.innerHTML = '<i class="fas fa-check"></i>';
        checkBtn.classList = "check act-btn";
        completeItem(checkBtn);

        //Appending Elements
        todoActBtns.appendChild(checkBtn);
        todoActBtns.appendChild(trashBtn);

        todoItem.appendChild(todoText);
        todoItem.appendChild(todoActBtns);

        todoList.appendChild(todoItem);
    });
};

document.addEventListener("DOMContentLoaded", initTodos);
