const taskInput = document.querySelector("#task-input");
const addBtn = document.querySelector("#add-btn");
const validationMessage = document.querySelector("#validation-message");
const taskCounter = document.querySelector("#task-counter");
const clearCompletedBtn = document.querySelector("#clear-completed-btn");
const emptyState = document.querySelector("#empty-state");
const taskList = document.querySelector("#task-list");
const storageKey = "hexsoftwaresTodoTasks";

let tasks = [];

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(storageKey);
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    tasks = [];
  }

  renderTasks();
}

function saveTasks() {
  localStorage.setItem(storageKey, JSON.stringify(tasks));
}

function addTask(text) {
  tasks.unshift({
    id: createTaskId(),
    text,
    completed: false,
  });

  saveTasks();
  renderTasks();
}

function createTaskId() {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  saveTasks();
  renderTasks();
}

function toggleTask(id) {
  const selectedTask = tasks.find(function (task) {
    return task.id === id;
  });

  if (selectedTask) {
    selectedTask.completed = !selectedTask.completed;
  }

  saveTasks();
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  const remainingTasks = tasks.filter(function (task) {
    return !task.completed;
  });
  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  });

  taskCounter.textContent = `${remainingTasks.length} ${remainingTasks.length === 1 ? "task" : "tasks"} remaining`;
  clearCompletedBtn.hidden = completedTasks.length === 0;
  emptyState.hidden = tasks.length !== 0;

  tasks.forEach(function (task) {
    taskList.appendChild(createTaskElement(task));
  });
}

function createTaskElement(task) {
  const taskItem = document.createElement("article");
  const checkbox = document.createElement("button");
  const taskText = document.createElement("span");
  const deleteBtn = document.createElement("button");

  taskItem.className = "task-item";
  taskItem.dataset.id = task.id;

  if (task.completed) {
    taskItem.classList.add("completed");
  }

  checkbox.className = "check-btn";
  checkbox.type = "button";
  checkbox.textContent = task.completed ? "Done" : "Todo";
  checkbox.setAttribute(
    "aria-label",
    task.completed ? "Mark task as incomplete" : "Mark task as complete",
  );

  taskText.className = "task-text";
  taskText.textContent = task.text;

  deleteBtn.className = "delete-btn";
  deleteBtn.type = "button";
  deleteBtn.textContent = "Delete";
  deleteBtn.setAttribute("aria-label", `Delete task: ${task.text}`);

  checkbox.addEventListener("click", function () {
    toggleTask(task.id);
  });

  deleteBtn.addEventListener("click", function () {
    deleteTask(task.id);
  });

  taskItem.append(checkbox, taskText, deleteBtn);
  return taskItem;
}

function handleAddClick() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    validationMessage.hidden = false;
    return;
  }

  validationMessage.hidden = true;
  addTask(taskText);
  taskInput.value = "";
  taskInput.focus();
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    handleAddClick();
  }
}

function clearCompletedTasks() {
  tasks = tasks.filter(function (task) {
    return !task.completed;
  });

  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", handleAddClick);
taskInput.addEventListener("keydown", handleKeyPress);
clearCompletedBtn.addEventListener("click", clearCompletedTasks);

validationMessage.hidden = true;
loadTasks();
