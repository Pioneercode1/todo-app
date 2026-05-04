const themeBtn = document.querySelector('.btn-theme');
const themeImg = document.querySelector('.img-theme');
const sourceDesktop = document.querySelector('.picture source');
const imgMobile = document.querySelector('.picture img');



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