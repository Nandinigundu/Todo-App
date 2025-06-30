document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if (storedTasks){
        storedTasks.forEach((task)=>tasks.push(task));
        updateTasksList();
        updateStats();
    }
})

const tasks = [];

const saveTasks = ()=>{
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


const onclickTask = ()=>{
    const taskInput = document.getElementById("taskInput")
    const taskText = taskInput.value.trim()
    if (taskText){
        tasks.push({taskText: taskText, completed: false});
        taskInput.value="";
        updateTasksList();
        updateStats();
        saveTasks();
    } 
};

const toggleTaskComplete = (index)=>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};

const deleteTask = (index)=>{
    tasks.splice(index,1);
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index)=>{
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].taskText

    tasks.splice(index, 1)
    updateTasksList();
    updateStats();
    saveTasks();
};

const updateStats = ()=>{
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;

    const progress = (completedTasks/totalTasks)*100;

    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById("score").innerText = `${completedTasks}/${totalTasks}`;

    if (tasks.length && completedTasks === totalTasks){
        blastConfetti();
    }
};

const updateTasksList = () =>{
    const taskList = document.getElementById("task-list");
    taskList.innerHTML="";

    tasks.forEach((task,index) =>{
        const listItem = document.createElement("li")
        listItem.innerHTML=`
        <div class="listItem">
            <div class="task ${task.completed?'completed':""}">
                <input type="checkbox" class="checkbox" ${task.completed? "checked":""} />
                <p>${task.taskText}</p>
            </div>
            <div class="icons">
                <img src="https://img.icons8.com/material-outlined/24/ffffff/edit--v1.png" onClick="editTask(${index})" />
                <img src="https://img.icons8.com/material-outlined/24/ffffff/trash--v1.png" onClick="deleteTask(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener("change",()=>toggleTaskComplete(index));
        taskList.append(listItem)
    })
};



document.getElementById("newTask").addEventListener("click",function(e){
    e.preventDefault();
     onclickTask();
});

const blastConfetti = ()=>{
    function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
    }

    confetti({
    angle: randomInRange(55, 125),
    spread: randomInRange(50, 70),
    particleCount: randomInRange(50, 100),
    origin: { y: 0.6 },
    });
}