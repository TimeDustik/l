"use strict";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let editingIndex = -1;

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        addTaskToDOM(task, index);
    });
}

function addTaskToDOM(task, index) {
    const li = document.createElement("li");
    
    if (editingIndex === index) {

        li.innerHTML = `
            <div class="editing-mode">
                <input type="text" class="edit-input" value="${task.replace(/"/g, '&quot;')}" id="editInput${index}">
                <div class="edit-buttons">
                    <button class="save-btn" onclick="saveTask(${index})">Зберегти</button>
                    <button class="cancel-btn" onclick="cancelEdit()">Скасувати</button>
                </div>
            </div>
        `;
    } else {

        li.innerHTML = `
            <div class="task-content" onclick="removeTask(${index})">${task}</div>
            <div class="edit-container">
                <button class="edit-btn" onclick="editTask(${index})"></button>
            </div>
        `;
    }
    
    taskList.appendChild(li);
}

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks(tasks);
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTaskButton.click();
    }
});

function editTask(index) {
    editingIndex = index;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
    
    setTimeout(() => {
        const editInput = document.getElementById(`editInput${index}`);
        if (editInput) {
            editInput.focus();
            editInput.select();
        }
    }, 0);
}

function saveTask(index) {
    const editInput = document.getElementById(`editInput${index}`);
    const newText = editInput.value.trim();
    
    if (newText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks[index] = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        editingIndex = -1;
        renderTasks(tasks);
    }
}

function cancelEdit() {
    editingIndex = -1;
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(tasks);
}

function removeTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    editingIndex = -1;
    renderTasks(tasks);
}

document.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && e.target.classList.contains("edit-input")) {
        const index = parseInt(e.target.id.replace("editInput", ""));
        saveTask(index);
    }
});

document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && editingIndex !== -1) {
        cancelEdit();
    }
});

loadTasks();
