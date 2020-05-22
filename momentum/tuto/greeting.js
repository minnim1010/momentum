const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    userLS = "currentUser",
    greeting = document.querySelector(".js-greetings"),
    CNshowing = "showing";

function SaveName(text){
    localStorage.setItem(userLS, text);
}

function HandleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    SaveName(currentValue);
    PaintGreeting(currentValue);
}

function AskForName(){
    form.classList.add(CNshowing);
    form.addEventListener("submit", HandleSubmit);
}

function PaintGreeting(text){
    form.classList.remove(CNshowing)
    greeting.classList.add(CNshowing);
    greeting.innerText = `Hello ${text}!`;
}

function LoadName(){
    const currentUser = localStorage.getItem(userLS);
    if(currentUser === null){
        AskForName();
    }
    else{
        PaintGreeting(currentUser);
    }
}

function init(){
    LoadName();
}
init();