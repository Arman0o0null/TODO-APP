const todo_form = document.querySelector('form');
const todo_input = document.getElementById('todo-input');
const todoListUL = document.getElementById('todo-list');

let allTodos = getTodos();
updateTodoList();

todo_form.addEventListener('submit' , function(e){
    e.preventDefault();
    addTodo();
})

function addTodo(){
    const todoText = todo_input.value.trim();
    if(todoText.length > 0){
        const todoObject = {
            text: todoText, 
            completed: false,
        };
        allTodos.push(todoObject);
        updateTodoList();
        saveTodo();
        todo_input.value = "";
    }
}

function updateTodoList(){
    todoListUL.innerHTML = "";
    allTodos.forEach((todo, todoIndex)=>{
        todoItem = creatTodoItems(todo, todoIndex);
        todoListUL.append(todoItem);
    })
};

function creatTodoItems(todo, todoIndex){
    const todoId = 'todo-' + todoIndex;
    const todoLi = document.createElement('li');
    const todoText = todo.text;
    todoLi.className = "todo";
    todoLi.innerHTML =`
     <input type="checkbox" id="${todoId}">
                <label for="${todoId}" class="custom-checkbox">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="transparent"><path d="M382-253.85 168.62-467.23 211.38-510 382-339.38 748.62-706l42.76 42.77L382-253.85Z"/></svg>
            </label>
            <label for="${todoId}" class="todo-text">
               ${todoText}
            </label>
            <button class="delete-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill=" var(--secoundary-color)"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </button>
    `;
    const deletebutton = todoLi.querySelector(".delete-button");
    deletebutton.addEventListener("click", ()=>{
        deleteTodoItem(todoIndex);
    })
    const checkbox = todoLi.querySelector("input");
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked;
        saveTodo();
    })
    checkbox.checked = todo.completed;
    return todoLi;
};

function deleteTodoItem(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex);
    saveTodo();
    updateTodoList();
}

// function deleTodoItem(todoIndex){
//     allTodos = allTodos.filter((_ , i) => i !== todoIndex);
//     saveTodo();
//     updateTodoList();
// }

function saveTodo(){
    const todoJason = JSON.stringify(allTodos);
    localStorage.setItem("todos" , todoJason);
};

function getTodos(){
    const todos = localStorage.getItem("todos") || "[]";
    return JSON.parse(todos);
};
