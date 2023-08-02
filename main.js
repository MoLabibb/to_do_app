let tasksNumer = document.querySelector('header span strong');
let taskTitle  = document.querySelector('.input');
let addTaskBtn = document.querySelector('.add-task');
let tasksDiv   = document.querySelector('.tasks');
let clearTasks = document.querySelector('.clear');


let tasks = [];
tasksNumer.innerHTML = tasks.length ; 
if(window.localStorage.getItem('tasks')){
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
getDataFromLocalStorage();
addTaskBtn.onclick = function(){
    if(taskTitle.value !== ''){
        saveTaskInArray(taskTitle.value);
        taskTitle.value = '';
        taskTitle.focus();
    }
}


tasksDiv.addEventListener('click', (element)=>{
    let id = element.target.parentElement.getAttribute('data-id');
    if(element.target.classList.contains('delete')){
        element.target.parentElement.remove();
        deleteElementFromLocalStorage(id);
    }
    if(element.target.classList.contains('task')){
        element.target.classList.toggle('done');
        changeStatus(element.target.getAttribute('data-id'));
    }

})


function saveTaskInArray(text){
        const task = {
            id    : Date.now(),
            title : text,
            status:false,
        }
        tasks.push(task);
        addTaskToPage(tasks);
        addDataToLocalStorage(tasks);
}
function addTaskToPage(tasks){
    tasksNumer.innerHTML = tasks.length;
    tasksDiv.innerHTML = '';
    tasks.forEach((element)=>{
        let taskDiv = document.createElement('div');
        taskDiv.className = 'task';
        if(element.status === true){
            taskDiv.className = 'task done';
        }
        taskDiv.dataset.id = element.id;
        let taskText = document.createElement('p');
        taskText.appendChild(document.createTextNode(element.title));
        let deleteBtn = document.createElement('button');
        deleteBtn.appendChild(document.createTextNode('Delete'));
        deleteBtn.className = 'delete';
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteBtn);
        tasksDiv.appendChild(taskDiv);
    })
}
function addDataToLocalStorage(tasks){
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getDataFromLocalStorage(){
    let data  = window.localStorage.getItem('tasks');
    if(data){
    let tasks = JSON.parse(data);
    addTaskToPage(tasks);
    }

}

function deleteElementFromLocalStorage(id){
    tasks = tasks.filter((e)=> e.id != id);
    tasksNumer.innerHTML = tasks.length;
    addDataToLocalStorage(tasks);
}
function changeStatus(id){
    for(let i = 0 ; i < tasks.length; i++){
        if(tasks[i].id == id){   
        tasks[i].status === true ? tasks[i].status = false :tasks[i].status = true ;
        }
    }
    addDataToLocalStorage(tasks);
}

clearTasks.onclick = function(){
    localStorage.clear();
    tasks = [];
    addTaskToPage(tasks);

}