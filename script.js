/* themes */
const themeBtn = document.querySelector('.btn-theme');
const themeImg = document.querySelector('.img-theme');
const sourceDesktop = document.querySelector('.picture source');
const imgMobile = document.querySelector('.picture img');
/* add & edit & delete & done */
/* add task */
const todoList = document.getElementById("todo-list")
const todoText = document.getElementById("todo-text")

const allTask = [];
function addTask(newText) {
    const text = newText;
    if (text !== "") {
        allTask.push(text)
        createTask(text);
    }
}

function createTask(text) {
    const newtask = document.createElement("li");
    const checkbox = document.createElement("checkbox");
    const checkLabel = document.createElement("label");
    const textLabel = document.createElement("label");
    const deleteImg = document.createElement("img");
    /* */
    checkbox.className = "checkbox-todo";
    checkbox.id = "checkbox-todo";
    /* */
    checkLabel.className = "label-todo";
    checkLabel.attributes.for = "checkbox-todo";
    /* */
    textLabel.className = "label-todo-text";
    textLabel.attributes.for = "checkbox-todo";
    textLabel.innerText = text;
    /* */
    deleteImg.className = "img-x";
    deleteImg.src = "./images/icon-cross.svg";
    deleteImg.alt = "icon cross";
    /* */
    newtask.appendChild(checkbox);
    newtask.appendChild(checkLabel);
    newtask.appendChild(textLabel);
    newtask.appendChild(deleteImg);
    newtask.className = "todo";
    /* */
    todoList.append(newtask);
}

todoText.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask(todoText.value.trim());
    }
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


