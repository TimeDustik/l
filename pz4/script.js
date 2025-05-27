"use strict";

const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

// Функція для завантаження завдань з localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

// Функція для додавання завдання в DOM
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task;
    li.addEventListener("click", function() {
        removeTask(task);
    });
    taskList.appendChild(li);
}

// Функція для додавання завдання
addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText);
        saveTask(taskText);
        taskInput.value = ""; // Очистити поле після додавання
    }
});

// Функція для збереження завдання в localStorage
function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функція для видалення завдання
function removeTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    taskList.innerHTML = ""; // Очищення списку
    loadTasks(); // Перезавантаження завдань
}

// Завантаження завдань при завантаженні сторінки
loadTasks();
