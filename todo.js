let counter=0;

let todo=JSON.parse(localStorage.getItem('todo')) || [];

const todoinput=document.getElementById("todoInput");

const todoList=document.getElementById("todoList");

const todocount=document.getElementById("todoCount");

const addButton=document.querySelector(".btn");

const deleteButton=document.getElementById("deleteButton");

// Initialize

document.addEventListener("DOMContentLoaded",function (){
    addButton.addEventListener("click",addTask)
    todoinput.addEventListener("keydown",function(event){
        if(event.key==="Enter"){
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click",deleteAllTasks)
    displayTasks();
});

function addTask(){
    const newTask=todoinput.value.trim();  // it removes spaces
    console.log(newTask);
    if(newTask!==""){
        todo.push({
        text:newTask, disabled:false,
        });
        saveToLocalStorage();  // localstorage.setitem(json.strigify('todo'))
        todoinput.value="";
        displayTasks();
    }
}


function deleteAllTasks(){
    todo=[];
    saveToLocalStorage();
    displayTasks();
    // localStorage.removeItem("todo");   !!!!  this is false because it will still in the memory until refreshing  !!!!
    // displayTasks(); 
}


function displayTasks() {
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
        <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
        item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
        item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p>
        </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () =>
        toggleTask(index)
    );
    todoList.appendChild(p);
    });
    todoCount.textContent = counttasks();
    
}


function saveToLocalStorage(){
    localStorage.setItem("todo",JSON.stringify(todo));
}

function toggleTask(index){
    todo[index].disabled=!todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}


function counttasks(){
    counter=0;
    todo.forEach(element => {
        if(element.disabled===false){
            counter++;
        }
    });
    return counter;
}



