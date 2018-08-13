//UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Add tasks
const addTask = (e) => {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('Empty imput');
        return;
    }
    //create li lement
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.textContent = taskInput.value;
    // create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="material-icons">close</i>';
    li.appendChild(link);
    taskList.appendChild(li);
    // Store in localstorage
    storeTaskInLocalStorage(taskInput.value);
    //clear input
    taskInput.value = '';
    console.log();    
}

// Store task
const storeTaskInLocalStorage = (task) => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {//check if localstorage contain some elements
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// get tasks for local storage
const getTasks = () => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {//check if localstorage contain some elements
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = task;
        // create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="material-icons">close</i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })    
}

const removeTask = (e) => {
    //checking form parent element class remove then removing parent of parent element 
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to delete?')) {
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement.firstChild)
        }
    }
}

const removeTaskFromLocalStorage = (taskItem) => {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index) => {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const clearAllTasksFromLocalStorage = () => {
    localStorage.clear();
}

const clearTask = () => {
    if (confirm('Are you sure to deleta all tasks?')) {
        taskList.textContent = '';
        //claear all tasks frm local storage
        clearAllTasksFromLocalStorage();
    }
}

const filterTasks = (e) => {
    const serchContent = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach((task,index) => {
        const item  = task.firstChild.textContent.toLocaleLowerCase();
        if (item.indexOf(serchContent) != -1) {
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
        console.log('first child -->'+index+' ', item.indexOf(serchContent));
    })
}

//load all event listeners
const loadAlleEventListeners = () => {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
    filter.addEventListener('keyup', filterTasks);
    document.addEventListener('DOMContentLoaded', getTasks);
}

loadAlleEventListeners();
