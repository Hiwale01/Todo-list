let tasks = [];

function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const dateTimeInput = document.getElementById('dateTimeInput').value;

    if (taskInput === "" || dateTimeInput === "") {
        alert("Please enter a task and select a date and time.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput,
        dateTime: dateTimeInput,
        timer: setTimer(dateTimeInput, taskInput)
    };

    tasks.push(task);
    renderTasks();

    document.getElementById('taskInput').value = "";
    document.getElementById('dateTimeInput').value = "";
}

function setTimer(dateTime, taskText) {
    const taskTime = new Date(dateTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = taskTime - currentTime;

    if (timeDifference > 0) {
        return setTimeout(() => {
            alert(`Task Due: ${taskText}`);
        }, timeDifference);
    } else {
        alert(`Task Time is in the Past: ${taskText}`);
    }
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement('li');

        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';

        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;

        const taskDateTime = document.createElement('span');
        taskDateTime.className = 'task-date-time';
        taskDateTime.textContent = new Date(task.dateTime).toLocaleString();

        taskContent.appendChild(taskText);
        taskContent.appendChild(taskDateTime);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeTask(task.id);

        li.appendChild(taskContent);
        li.appendChild(removeButton);

        taskList.appendChild(li);
    });
}

function removeTask(id) {
    tasks = tasks.filter(task => {
        if (task.id === id) {
            clearTimeout(task.timer);
            return false;
        }
        return true;
    });
    renderTasks();
}
