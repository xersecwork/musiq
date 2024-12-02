document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const addTaskButton = document.getElementById("addTaskButton");

  // Telegram Web App initialization
  const tg = window.Telegram.WebApp;
  tg.expand();

  // Apply theme
  function applyTheme() {
    const theme = tg.themeParams.bg_color === "#ffffff" ? "light" : "dark";
    document.body.setAttribute("data-theme", theme);
  }
  applyTheme();

  // Load tasks from localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.textContent = task;
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "❌";
      deleteButton.onclick = () => deleteTask(index);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  }

  // Add a new task
  function addTask(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  // Delete a task
  function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }

  // Add task button click
  addTaskButton.addEventListener("click", () => {
    const task = prompt("Введите задачу:");
    if (task) addTask(task);
  });

  // Initial load
  loadTasks();
});
