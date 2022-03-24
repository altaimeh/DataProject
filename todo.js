window.onload = () => {
    setTimeout(() => {
      document.querySelector("body").classList.add("display");
    }, 10);
  };
  
  document.querySelector(".hamburger-menu").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("change");
  });
  
  /*document.querySelector(".scroll-btn").addEventListener("click", () => {
    document.querySelector("html").style.scrollBehavior = "smooth";
    setTimeout(() => {
      document.querySelector("html").style.scrollBehavior = "unset";
    }, 1000);
  });*/
//Selectors for todo inputs
const taskManagerInput = document.querySelector('.todo-input');

// Muneeb Khan
const taskManagerInputCategory = document.querySelector('.todo-input-category');
const taskManagerInputDate = document.querySelector('.todo-input-date');
const taskManagerInputPriority = document.querySelector('.todo-input-priority');

/*const taskManagerInputCategory = document.querySelector('.todo-input-category');
const taskManagerInputDate = document.querySelector('.todo-input-date');
const taskManagerInputPriority = document.querySelector('.todo-input-priority');*/

const taskManagerButton = document.querySelector('.todo-button');

// Muneeb Khan
const taskManagerButtonCategory = document.querySelector('.todo-button-category');
const taskManagerButtonDate = document.querySelector('.todo-button-date');
const taskManagerButtonPriority = document.querySelector('.todo-button-priority');

/*const taskManagerButtonCategory = document.querySelector('.todo-button-category');
const taskManagerButtonDate = document.querySelector('.todo-button-date');
const taskManagerButtonPriority = document.querySelector('.todo-button-priority');*/

const taskManagerList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
//Event Listeners for task manager
document.addEventListener('DOMContentLoaded', taskManagerGetToDoList);
taskManagerButton.addEventListener('click', taskManagerAddToDoList);

// Muneeb Khan
taskManagerButtonCategory.addEventListener('click' ,taskManagerAddToDoList);
taskManagerButtonDate.addEventListener('click', taskManagerAddToDoList);
taskManagerButtonPriority.addEventListener('click',taskManagerAddToDoList);

/*taskManagerButtonCategory.addEventListener('click', taskManagerAddToDoList);
taskManagerButtonDate.addEventListener('click', taskManagerAddToDoList);
taskManagerButtonPriority.addEventListener('click', taskManagerAddToDoList);*/

taskManagerList.addEventListener('click', taskManagerDeleteTask);
filterOption.addEventListener('click', taskManagerFilter);
//function are below this line
function taskManagerAddToDoList(inputValue) {
    //This prevents the task manager form from automatically submitting values
    inputValue.preventDefault();
    //This creates the todo DIV for the task manager
    const taskManagerToDoQuery = document.createElement('div');
    taskManagerToDoQuery.classList.add("todo");
    //This creates the list
    const taskManagerToDoQueryNew = document.createElement('li');
    taskManagerToDoQueryNew.innerText = taskManagerInput.value;

    // Muneeb Khan
    taskManagerToDoQueryNew.innerText = taskManagerInputCategory.value;
    taskManagerToDoQueryNew.innerText = taskManagerInputDate.value;
    taskManagerToDoQueryNew.innerText = taskManagerInputPriority.value;

    //Dont delete these comments this is for the the additional categories

    /*taskManagerToDoQueryNew.innerText = taskManagerInputCategory.value;
    taskManagerToDoQueryNew.innerText = taskManagerInputDate.value;
    taskManagerToDoQueryNew.innerText = taskManagerInputPriority.value;*/

    taskManagerToDoQueryNew.classList.add('todo-item');
    taskManagerToDoQuery.appendChild(taskManagerToDoQueryNew);
    //This adds todo tasks to the local storage be viewed
    taskManagerSaveTasks(taskManagerInput.value);

    //Dont delete these comments this is for the the additional categories

    // Muneeb Khan
    taskManagerSaveTasks(taskManagerInputCategory.value);
    taskManagerSaveTasks(taskManagerInputDate.value);
    taskManagerSaveTasks(taskManagerInputPriority.value);

    /*taskManagerSaveTasks(taskManagerInputCategory.value);
    taskManagerSaveTasks(taskManagerInputDate.value);
    taskManagerSaveTasks(taskManagerInputPriority.value);*/

    //This is the checkmark button
    const taskManagerFinishedButton = document.createElement('button');
    taskManagerFinishedButton.innerHTML = '<i class="fas fa-check"></i>';
    taskManagerFinishedButton.classList.add("complete-btn");
    taskManagerToDoQuery.appendChild(taskManagerFinishedButton);
    //This is the delete button
    const taskManagerDeleteButton = document.createElement('button');
    taskManagerDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    taskManagerDeleteButton.classList.add("trash-btn");
    taskManagerToDoQuery.appendChild(taskManagerDeleteButton);
    //This allows the task manager to append to list
    taskManagerList.appendChild(taskManagerToDoQuery);
    //This allows the task manager to clear todo input values
    taskManagerInput.value = "";

    //Dont delete these comments this is for the the additional categories

    // Muneeb Khan
    taskManagerInputCategory.value = "";
    taskManagerInputDate.value = "";
    taskManagerInputPriority.value = "";

    /*taskManagerInputCategory.value = "";
    taskManagerInputDate.value = "";
    taskManagerInputPriority.value = "";*/
}

function taskManagerDeleteTask(e) {
    const taskManagerItemQuery = e.target;
    //This deletes the task
    if(taskManagerItemQuery.classList[0] === "trash-btn") {
        const todoPlaceQuery = taskManagerItemQuery.parentElement;
        todoPlaceQuery.classList.add("fall");
        removeTasksWithThis(todoPlaceQuery);
        todoPlaceQuery.addEventListener("transitionend", function() {
            todoPlaceQuery.remove();
        });
    }

    //This is the check mark functionality to add to the completed section
    if(taskManagerItemQuery.classList[0] === "complete-btn") {
        const todoPlaceQueryComplete = taskManagerItemQuery.parentElement;
        todoPlaceQueryComplete.classList.toggle("completed");
    }
}

function taskManagerFilter(e) {
    const todoFilterCheck = taskManagerList.childNodes;
    todoFilterCheck.forEach(function(todoFilterOption) {
        switch(e.target.value) {
            case "all":
                todoFilterOption.style.display = "flex";
                break;
            case "completed":
                if(todoFilterOption.classList.contains("completed")) {
                    todoFilterOption.style.display = "flex";
                }
                else {
                    todoFilterOption.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todoFilterOption.classList.contains("completed")) {
                    todoFilterOption.style.display = "flex";
                }
                else {
                    todoFilterOption.style.display = "none";
                }
                break;
        }
    });
}


function taskManagerSaveTasks(todoSaveInput) {
    let saveTasksToDo;
    if(localStorage.getItem('todos') === null) {
        saveTasksToDo = [];
    }
    else {
        saveTasksToDo = JSON.parse(localStorage.getItem('todos'));
    }
    saveTasksToDo.push(todoSaveInput);
    localStorage.setItem('todos', JSON.stringify(saveTasksToDo));
}

function taskManagerGetToDoList() {
    let getToDoTask;
    if(localStorage.getItem('todos') === null) {
        getToDoTask = [];
    }
    else {
        getToDoTask = JSON.parse(localStorage.getItem('todos'));
    }
    getToDoTask.forEach(function(todoGetCheck) {
        const taskManagerToDoQuery = document.createElement('div');
        taskManagerToDoQuery.classList.add("todo");
        //This creates the list for the task manager
        const taskManagerToDoQueryNew = document.createElement('li');
        taskManagerToDoQueryNew.innerText = todoGetCheck;
        taskManagerToDoQueryNew.classList.add('todo-item');
        taskManagerToDoQuery.appendChild(taskManagerToDoQueryNew);
        
        //This is the checkmark button
        const taskManagerFinishedButton = document.createElement('button');
        taskManagerFinishedButton.innerHTML = '<i class="fas fa-check"></i>';
        taskManagerFinishedButton.classList.add("complete-btn");
        taskManagerToDoQuery.appendChild(taskManagerFinishedButton);
        //This is the delete button
        const taskManagerDeleteButton = document.createElement('button');
        taskManagerDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskManagerDeleteButton.classList.add("trash-btn");
        taskManagerToDoQuery.appendChild(taskManagerDeleteButton);
        //This allows the task manager to append to list
        taskManagerList.appendChild(taskManagerToDoQuery);
    });
}

function removeTasksWithThis(inputRemove) {
    let removeTask;
    if(localStorage.getItem('todos') === null) {
        removeTask = [];
    }
    else {
        removeTask = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = inputRemove.children[0].innerText;
    removeTask.splice(removeTask.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(removeTask));
}

// Functionalities for table
