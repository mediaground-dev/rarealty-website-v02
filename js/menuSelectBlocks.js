const menuBlock01 = document.querySelector('#menu-block-01');
const menuBlock02 = document.querySelector('#menu-block-02');
const menuBlock03 = document.querySelector('#menu-block-03');
const menuBlock04 = document.querySelector('#menu-block-04');
const menuBlock05 = document.querySelector('#menu-block-05');

const block01 = document.querySelector('.block-01');
const block02 = document.querySelector('.block-02');
const block03 = document.querySelector('.block-03');
const block04 = document.querySelector('.block-04');
const block05 = document.querySelector('.block-05');


menuBlock01.addEventListener('click', () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block01.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock01.classList.add('menu-block-selected');
});

menuBlock02.addEventListener('click', () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block02.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock02.classList.add('menu-block-selected');
});

menuBlock03.addEventListener('click', () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block03.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock03.classList.add('menu-block-selected');
});

menuBlock04.addEventListener('click', () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block04.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock04.classList.add('menu-block-selected');
});

menuBlock05.addEventListener('click', () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block05.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock05.classList.add('menu-block-selected');
});



