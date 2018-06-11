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
    taskInput.value = '';
    console.log();    
}

const removeTask = (e) => {
    //checking form parent element class remove then removing parent of parent element 
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to delete?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

const clearTask = () => {
    taskList.textContent = '';
}

//load all event listeners
const loadAlleEventListeners = () => {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTask);
}

loadAlleEventListeners();
