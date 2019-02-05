// Define our UIs Variables
const form =document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearbtn =document.querySelector('.clear-tasks');
const filter =document.getElementById('filter');
const taskInput =document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners(){
    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded',getTasks)
    // Add Task Event
    form.addEventListener('submit',addTask);
    // Remove Task Event 
    taskList.addEventListener('click',removeTask);
    clearbtn.addEventListener('click',deleteAllTasks);
    // filter tasks event
    filter.addEventListener('keyup',filterTasks);
    
}
// GET TASKS FROM LOCALsTORAGE
function getTasks(){
    let tasks ;
    if(localStorage.getItem('tasks')==null){
        tasks= [];
    }else {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
      // create li Element
const li =document.createElement('li');
// Add class
li.className='collection-item';
// create text node and append to the li
li.appendChild(document.createTextNode(task));
// create new Link Element
const link = document.createElement('a');
//  Add Class
link.className='delete-item secondary-content';
// Add Icon HTML
link.innerHTML='<i class="fa fa-times"></i>';
// append the link to li
li.appendChild(link);
console.log(li);
// Append the li to ul
taskList.appendChild(li);
    }); 
}

function addTask(e){
    if(taskInput.value===''){
    alert('add a task');
    }
// create li Element
const li =document.createElement('li');
// Add class
li.className='collection-item';
// create text node and append to the li
li.appendChild(document.createTextNode(taskInput.value));
// create new Link Element
const link = document.createElement('a');
//  Add Class
link.className='delete-item secondary-content';
// Add Icon HTML
link.innerHTML='<i class="fa fa-times"></i>';
// append the link to li
li.appendChild(link);
console.log(li);
// Append the li to ul
taskList.appendChild(li);

// store in local storage
storeTaskInLocalStorage(taskInput.value);
// Clear the input
taskInput.value='';    
    e.preventDefault();

}
// Store Task In LS
function storeTaskInLocalStorage(task){
    let tasks ;
    if(localStorage.getItem('tasks')==null){
        tasks= [];
    }else {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Remove task 
function removeTask(e){
    
    // if(e.target.classList.contains('fa-times')){
    // e.target.parentElement.parentElement.remove();
    // }
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are You sure ? ')){
            e.target.parentElement.parentElement.remove();
        //    Remove Task from LS
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
       
    }
}
// Remove Task from Ls
function removeTaskFromLocalStorage(taskItem){
    let tasks ;
    if(localStorage.getItem('tasks')==null){
        tasks= [];
    }else {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
 if(taskItem.textContent===task){
      tasks.splice(index,1);
 }
    });

localStorage.setItem('tasks',JSON.stringify(tasks));

}
// Delete All Tasks 

function deleteAllTasks(){
    // first solution
    // taskList.innerHTML='';
    
    // faster solution
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // clear tasks from LS
    clearTasksFromLocalStorage();
}
// clear tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear();

}

// Filter tasks
function filterTasks(e){
const val= e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(colItem){
const item =colItem.firstChild.textContent;
if(item.toLowerCase().indexOf(val)!=-1){
colItem.style.display='block';
}else {
    colItem.style.display='none';
}
});


}