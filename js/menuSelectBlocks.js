import { fetchCardsByTag } from './utils/fetch-strapi.js';

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

const docCardCollection = document.querySelector('#card-collection');

docCardCollection.innerHTML = '';

const tag = menuBlock01.getAttribute('tag')
const strapiResponse = await fetchCardsByTag(tag);

strapiResponse.forEach((article, index) => {
    const CardImageURL = article.attributes.CardImage.data.attributes.url;
    docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
});

menuBlock01.addEventListener('click', async () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block01.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock01.classList.add('menu-block-selected');

    docCardCollection.innerHTML = '';

    const tag = menuBlock01.getAttribute('tag')
    const strapiResponse = await fetchCardsByTag(tag);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
    });
});

menuBlock02.addEventListener('click', async () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block02.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock02.classList.add('menu-block-selected');

    docCardCollection.innerHTML = '';

    const tag = menuBlock02.getAttribute('tag')
    const strapiResponse = await fetchCardsByTag(tag);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
    });
});

menuBlock03.addEventListener('click', async () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block03.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock03.classList.add('menu-block-selected');

    docCardCollection.innerHTML = '';

    const tag = menuBlock03.getAttribute('tag')
    const strapiResponse = await fetchCardsByTag(tag);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
    });
});

menuBlock04.addEventListener('click', async () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block04.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock04.classList.add('menu-block-selected');

    docCardCollection.innerHTML = '';

    const tag = menuBlock04.getAttribute('tag')
    const strapiResponse = await fetchCardsByTag(tag);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
    });
});

menuBlock05.addEventListener('click', async () => {
    document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
    block05.classList.replace('block-unselected', 'block-selected');

    document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
    menuBlock05.classList.add('menu-block-selected');

    docCardCollection.innerHTML = '';

    const tag = menuBlock05.getAttribute('tag')
    const strapiResponse = await fetchCardsByTag(tag);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
    });
});
