const root = document.documentElement; // весь документ
const darkBackground = '#2b2b2b';
const lightBackground = '#fafafa';
const darkText = '#424242';
const lightText = '#fff';

// SITE COLOR. Код позволяет настроить главный цвет фона. Н-р, можно переключить тёмный на светлый

// document.querySelector('body').addEventListener('click', () => {
//     // если есть темная тема (проверяем), то делаем светлую
//     if(document.body.classList.contains('dark-theme')) {
//         root.style.setProperty('--theme-background', lightBackground);
//         root.style.setProperty('--theme-text', darkText);
//         document.body.classList.remove('dark-theme');
//         document.body.classList.add('light-theme');
//     } else {
//         root.style.setProperty('--theme-background', darkBackground);
//         root.style.setProperty('--theme-text', lightText);
//         document.body.classList.add('dark-theme');
//         document.body.classList.remove('light-theme');
//     }
// });


// VIDEO PLAYING

const videoPlay = document.querySelector('.video-controller--play');
const videoPause = document.querySelector('.video-controller--pause');
const video = document.querySelector('.video');
const barLine = document.querySelector('.bar__line');

// включение видео
videoPlay.addEventListener('click', () => {
    video.play();
    videoPlay.style.display = 'none';
    videoPause.style.display = 'block';
});

// выключение видео
videoPause.addEventListener('click', () => {
    video.pause();
    videoPause.style.display = 'none';
    videoPlay.style.display = 'block';
});

// полоска проигрывателя
video.ontimeupdate = function () {
    let percentAge =  (video.currentTime / video.duration) * 100;
    console.log(percentAge); // строка в процентах двигается
    // движение
    barLine.style.width = percentAge + '%';
};

//  MENU
const burger = document.querySelector('.burger');
const close = document.querySelector('.close');
const menu = document.querySelector('.menu');
const body = document.body;

let keys = {
    ESC: 27,
};

// ДОСТУПНОСТЬ, для того, чтобы при открытом меню, кликались только активные элементы, а не весь сайт (подключили библиотеку inert.js), все что нужно для этой доступности пометила тут **
menu.inert = true;

let previousActiveElement;


// меню открывается по клику
function showMenu() {
    menu.classList.add('menu--showed');
    body.style.overflow = 'hidden';

    previousActiveElement = document.activeElement;

    Array.from(body.children).forEach((child) => {
        if(child !== menu) {
            child.inert = true; // мы пробегаемся по всем элементам сайта, проверяем, если он не находится в меню или не само меню, значит он заглушается
        }
    });

    menu.inert = false; // если не так, то заглушки не будет
    close.focus(); // при открытии меню фокус встает на крестик

    // обработчик, keydown - нажатие на кнопку
    // e - event-событие
    // когда мы кликаем на любую кнопку на клаве, отлавливает собитие и пишет функцию. е - само событие. esc - кнопка 27 выхода на клаве
    document.addEventListener('keydown', function(e) {
        if(e.keyCode === keys.ESC) {
            closeMenu();
        }
    });
};

function closeMenu() {
    menu.classList.remove('menu--showed');
    body.style.overflow = 'initial'; // отключение скролла при открытом меню

    Array.from(body.children).forEach((child) => {
        if(child !== menu) {
            child.inert = false;
        }
    });

    menu.inert = false;
    previousActiveElement.focus();
};


burger.addEventListener('click', showMenu);
close.addEventListener('click', closeMenu);
