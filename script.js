document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  // Load existing tasks or start with an empty list
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Save current tasks to local storage
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Render all tasks to the UI
  const renderTasks = () => {
    taskList.innerHTML = ""; // Clear the list first

    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className = "flex items-center justify-between bg-gray-100 px-4 py-2 rounded";

      // Create a wrapper to hold the icon and text
      const textWrapper = document.createElement("div");
      textWrapper.className = "flex items-center flex-1 gap-2 cursor-pointer";

      // Create SVG icon for checkmark (done) or empty box (not done)
      const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      icon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      icon.setAttribute("viewBox", "0 0 24 24");
      icon.setAttribute("width", "24");
      icon.setAttribute("height", "24");
      icon.classList.add("flex-shrink-0");

      // Define the inner SVG path
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

      if (task.done) {
        // Green checkmark box
        path.setAttribute("fill", "#10B981"); // Tailwind green-500
        path.setAttribute("d", "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z");
      } else {
        // Empty box outline
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", "#9CA3AF"); // Tailwind gray-400
        path.setAttribute("stroke-width", "2");
        path.setAttribute("d", "M5 5h14v14H5z");
      }

      icon.appendChild(path);

      // Create the task text
      const text = document.createElement("span");
      text.textContent = task.text;
      text.className = task.done ? "line-through text-gray-500" : "";

      // Toggle the "done" state when the wrapper is clicked
      textWrapper.onclick = () => {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      };

      textWrapper.appendChild(icon);
      textWrapper.appendChild(text);

      // Create delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.className = "ml-2 text-red-500 hover:text-red-700";
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      };

      // Add everything to the list item
      li.appendChild(textWrapper);
      li.appendChild(delBtn);
      taskList.appendChild(li);
    });
  };

  // Add new task
  addTaskButton.onclick = () => {
    const value = taskInput.value.trim();
    if (value) {
      tasks.push({ text: value, done: false });
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  };

  // Initial rendering
  renderTasks();
});
