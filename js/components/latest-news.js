import { fetchCardsByDate, fetchCardsByTag } from "../utils/fetch-strapi.js";

const docTabAll   = document.querySelector('#TabAll');
const docTabTag01 = document.querySelector('#TabTag01');
const docTabTag02 = document.querySelector('#TabTag02');
const docTabTag03 = document.querySelector('#TabTag03');
const docTabTag04 = document.querySelector('#TabTag04');

const docCardCollection = document.querySelector('#card-collection2');

docCardCollection.innerHTML = '';
const limit = 6;

const renderCollectionByTag = async (strapiResponse) => {
    docCardCollection.innerHTML = '';
    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<a href="./article.html?${article.id}">
                                            <div class="card card-0${index + 1}">
                                                <div style="background: url('${CardImageURL}')" class="card-img"></div>
                                                <h3>${article.attributes.Tags}</h3>
                                                <h1>${article.attributes.Title}</h1>
                                            </div>
                                        </a>`;
    });
};

const strapiResponse = await fetchCardsByDate(limit);
renderCollectionByTag(strapiResponse);

docTabAll.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabAll.classList.add('latest-menu-selected');

    const strapiResponse = await fetchCardsByDate(limit);
    renderCollectionByTag(strapiResponse);
})

docTabTag01.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabTag01.classList.add('latest-menu-selected');

    const tag = docTabTag01.getAttribute('tag');
    const strapiResponse = await fetchCardsByTag(tag);
    renderCollectionByTag(strapiResponse);
})

docTabTag02.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabTag02.classList.add('latest-menu-selected');

    const tag = docTabTag02.getAttribute('tag');
    const strapiResponse = await fetchCardsByTag(tag);
    renderCollectionByTag(strapiResponse);
})

docTabTag03.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabTag03.classList.add('latest-menu-selected');

    const tag = docTabTag03.getAttribute('tag');
    const strapiResponse = await fetchCardsByTag(tag);
    renderCollectionByTag(strapiResponse);
})

docTabTag04.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabTag04.classList.add('latest-menu-selected');

    const tag = docTabTag04.getAttribute('tag');
    const strapiResponse = await fetchCardsByTag(tag);
    renderCollectionByTag(strapiResponse);
})

//TODO
// docViewMoreBtn.addEventListener('click', () => {
//     const tag = docTabSelected.getAttribute('tag'); => docTabSelected be css selected class
//     renderCollectionByTag(tag);
// })
