const toDoForm = document.querySelector(".js-todoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-todoList"),
    TODO = "todos";
let TODOS = [];

function DeleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = TODOS.filter(todo => {
        return todo.id !== parseInt(li.id);}); 
    TODOS = cleanToDos;
    SaveToDos();
}

function SaveToDos(){
    localStorage.setItem("todos", JSON.stringify(TODOS));
}

function PaintToDos(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", DeleteToDo);
    delBtn.innerText = "X";
    delBtn.classList.add("btn");
    delBtn.classList.add("btn-outline-danger"); 
    delBtn.style = "";
    li.classList.add("todo");
    li.classList.add("justify-content-between");
    const span = document.createElement("span");
    const newID = TODOS.length+1;
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newID;
    toDoList.appendChild(li);
    const toDoObj = {
        id: newID,
        text: text
    };
    TODOS.push(toDoObj);
    SaveToDos();
}

function HandleSubmit(){
    event.preventDefault();
    const toDo = toDoInput.value;
    PaintToDos(toDo);
    toDoInput.value = "";
}


function LoadToDos(){
    const loadToDos = localStorage.getItem(TODO);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(toDo => {PaintToDos(toDo.text);});
    }
}

function init(){
    LoadToDos();
    toDoForm.addEventListener("submit", HandleSubmit);
}
init();