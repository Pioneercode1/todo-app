/* themes */
const themeBtn = document.querySelector('.btn-theme');
const themeImg = document.querySelector('.img-theme');
const sourceDesktop = document.querySelector('.picture source');
const imgMobile = document.querySelector('.picture img');
/* add & edit & delete & done */
const btnAll = document.getElementById("btn-all");
const btnActive = document.getElementById("btn-active");
const btnCompleted = document.getElementById("btn-completed");
const btnClear = document.getElementById("btn-clear-completed");
/* */
const todoList = document.getElementById("todo-list");
const todoText = document.getElementById("todo-text");
const dynamicNumber = document.getElementById("dynamic-number");

let allTask = [];
let taskIdCounter = 0;
function addTask(newText) {
    if (newText !== "") {
        const task = {
            id: ++taskIdCounter,
            newText: newText,
            isCompleted: false,
        };

        allTask.push(task)
        createTask(task);
        updateCounter();
        todoText.value = "";
    }
}

function updateCounter() {
    dynamicNumber.innerText = allTask.length;
}

function createTask(task) {
    const newtask = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const checkLabel = document.createElement("label");
    const textLabel = document.createElement("label");
    const deleteImg = document.createElement("img");
    /* */
    checkbox.className = "checkbox-todo";
    checkbox.id = `checkbox-todo-${task.id}`;
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () => {
        task.isCompleted = checkbox.checked;
        updateCounter();
    });
    /* */
    checkLabel.className = "label-todo";
    checkLabel.htmlFor = checkbox.id;
    /* */
    textLabel.className = "label-todo-text";
    textLabel.htmlFor = checkbox.id;
    textLabel.innerText = task.newText;
    /* */
    deleteImg.className = "img-x";
    deleteImg.src = "./images/icon-cross.svg";
    deleteImg.alt = "icon cross";
    deleteImg.addEventListener("click", () => {
        newtask.remove();
        allTask = allTask.filter(t => t.id !== task.id);
        updateCounter();
    });

    /* */
    newtask.append(checkbox, checkLabel, textLabel, deleteImg);
    newtask.className = "todo";
    newtask.setAttribute("draggable", "true");

    newtask.addEventListener("dragstart", (e) => {
        newtask.classList.add("dragging");
        e.dataTransfer.setData("text/plain", task.id);
    });

    newtask.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    newtask.addEventListener("dragend", () => {
        newtask.classList.remove("dragging");
    });

    newtask.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedTaskId = e.dataTransfer.getData("text/plain");
        reorderTasks(draggedTaskId, task.id);
    });

    /* */
    todoList.append(newtask);

    btnClear.addEventListener("click", () => {
        allTask = allTask.filter(t => t.isCompleted === false);
        statusCheck("all");
        updateCounter();
    });
}

function reorderTasks(draggedId, targetId) {
    // 1. العثور على مكان العنصرين في المصفوفة
    const draggedIndex = allTask.findIndex(t => t.id == draggedId);
    const targetIndex = allTask.findIndex(t => t.id == targetId);
    // 2. إزالة العنصر من مكانه القديم
    const [draggedItem] = allTask.splice(draggedIndex, 1);
    // 3. وضعه في مكانه الجديد
    allTask.splice(targetIndex, 0, draggedItem);
    // 4. إعادة رسم القائمة بالترتيب الجديد
    statusCheck("all");
}

todoText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask(todoText.value.trim());
    }

});

function statusCheck(type) {
    let filteredList = [];
    if (type === "all") {
        filteredList = allTask;
    } else if (type === "active") {
        filteredList = allTask.filter(t => t.isCompleted === false);
    } else if (type === "completed") {
        filteredList = allTask.filter(t => t.isCompleted === true);
    }
    displayTasks(filteredList);
}

function displayTasks(tasksArray) {
    todoList.innerHTML = "";
    tasksArray.forEach(task => {
        createTask(task);
    });
}

btnAll.addEventListener("click", () => {
    statusCheck("all");
});
btnActive.addEventListener("click", () => {
    statusCheck("active");
});
btnCompleted.addEventListener("click", () => {
    statusCheck("completed");
});

/* theme */
function setDarkTheme() {
    document.documentElement.setAttribute('mode-theme', 'dark');
    themeImg.src = './images/icon-sun.svg';
    sourceDesktop.srcset = './images/bg-desktop-dark.jpg';
    imgMobile.src = './images/bg-mobile-dark.jpg';
    localStorage.setItem("mode-theme", "dark");
}

function setLightTheme() {
    document.documentElement.removeAttribute('mode-theme');
    themeImg.src = './images/icon-moon.svg';
    sourceDesktop.srcset = './images/bg-desktop-light.jpg';
    imgMobile.src = './images/bg-mobile-light.jpg';
    localStorage.setItem("mode-theme", "light");
}

function startTheme() {
    const isTheme = localStorage.getItem('mode-theme');
    if (isTheme === 'dark') {
        setDarkTheme();
    } else {
        setLightTheme();
    }
}

startTheme();

themeBtn.addEventListener('click', () => {

    const isDark = document.documentElement.getAttribute('mode-theme') === 'dark';

    if (isDark) {
        setLightTheme();
    } else {
        setDarkTheme();
    }

});


