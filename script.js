// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Add new task
addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create list item
  const listItem = document.createElement("li");

  // Checkbox for completion
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    listItem.classList.toggle("completed", this.checked);
  });

  // Span for task text
  const span = document.createElement("span");
  span.innerText = taskText;

  // Enable inline editing on double-click
  span.addEventListener("dblclick", function () {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.innerText;
    listItem.replaceChild(editInput, span);
    editInput.focus();

    function saveEdit() {
      const newText = this.value.trim();
      if (newText !== "") span.innerText = newText;
      listItem.replaceChild(span, this);
    }

    editInput.addEventListener("blur", saveEdit);
    editInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") saveEdit.call(this);
    });
  });

  // Delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", function () {
    taskList.removeChild(listItem);
  });

  // Assemble and append
  listItem.appendChild(checkbox);
  listItem.appendChild(span);
  listItem.appendChild(deleteButton);
  taskList.appendChild(listItem);

  // Clear input
  taskInput.value = "";
});

// Optional: Remove by clicking item (commented out since delete button handles it)
// taskList.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     taskList.removeChild(event.target);
//   }
// });
