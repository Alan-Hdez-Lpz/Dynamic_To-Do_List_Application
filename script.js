const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const searchInput = document.getElementById("searchInput");

let tasks = [];
let completedTasks = new Set();

function updateCounts() {
    totalCount.textContent = tasks.length;
    completedCount.textContent = completedTasks.size;
}

function createTaskElement(taskText, taskId) {
    const li = document.createElement("li");
    li.className = "task-item";
    li.setAttribute("data-id", taskId);

    const span = document.createElement("span");
    span.textContent = taskText;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            completedTasks.add(taskId);
        } else {
            span.style.textDecoration = "none";
            completedTasks.delete(taskId);
        }
        updateCounts();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.color = "red";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        tasks = tasks.filter(t => t.id !== taskId);
        completedTasks.delete(taskId);
        updateCounts();
    });

    const controls = document.createElement("div");
    controls.className = "task-controls";
    controls.appendChild(checkbox);
    controls.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(controls);

    return li;
}

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        errorMessage.textContent = "Task cannot be empty!";
        return;
    }

    errorMessage.textContent = "";

    const taskId = Date.now().toString();
    const taskElement = createTaskElement(taskText, taskId);

    taskList.appendChild(taskElement);
    tasks.push({ id: taskId, text: taskText });

    taskInput.value = "";
    updateCounts();
});

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    document.querySelectorAll("#taskList .task-item").forEach(taskItem => {
        const taskText = taskItem.querySelector("span").textContent.toLowerCase();
        taskItem.style.display = taskText.includes(searchTerm) ? "" : "none";
    });
});
