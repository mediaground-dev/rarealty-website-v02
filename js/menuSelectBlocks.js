import { fetchCardsByTag } from './utils/fetch-strapi.js';

const menuBlock01 = document.querySelector('#menu-block-01');

const docCardCollection = document.querySelector('#card-collection');

docCardCollection.innerHTML = '';

const tag = menuBlock01.getAttribute('tag')
const strapiResponse = await fetchCardsByTag(tag);

const cardRender = (strapiResponse) => {
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
};

cardRender(strapiResponse);

document.querySelectorAll('.menu-block').forEach((element, index) => {
    element.addEventListener('click', async () => {
        document.querySelector('.block-selected').classList.replace('block-selected', 'block-unselected');
        document.querySelector(`.block-0${index}`).classList.replace('block-unselected', 'block-selected');

        document.querySelector('.menu-block-selected').classList.remove('menu-block-selected');
        element.classList.add('menu-block-selected');

        docCardCollection.innerHTML = '';

        const tag = element.getAttribute('tag')
        const strapiResponse = await fetchCardsByTag(tag);

        cardRender(strapiResponse);
    });
});
