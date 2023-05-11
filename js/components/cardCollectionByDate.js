import { fetchCardsByDate } from '../utils/fetch-strapi.js';

const docCardCollectionDesk   = document.querySelector('#card-collection-desk');
const docCardCollectionMobile = document.querySelector('#card-collection-mobile');

const strapiResponse = await fetchCardsByDate();

if (!strapiResponse) {
    for (let index = 0; index < 4; index++) {
        docCardCollectionDesk.innerHTML += `
            <div class="cards-small">
                <a>
                    <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                    <h1 class="cards-small-h1">Title</h1>
                    <h2 class="cards-small-h2"> 0 minutes reading</h2>
                </a>
            </div>`;
    }
} else {
    strapiResponse.data.forEach((article) => {
        // IF CARD IMAGE HAS NOT BEEN LOADED
        if (article.attributes.CardImage.data === null) {
            docCardCollectionDesk.innerHTML +=`
                <div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        } else {
            const cardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollectionDesk.innerHTML +=`
                <div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('${cardImageURL}')" class="cards-small-img"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        }
    });
}

if (!strapiResponse) {
    for (let index = 0; index < 4; index++) {
        docCardCollectionMobile.innerHTML += `
        <div class="swiper-slide">
            <div class="cards-small">
                <a>
                    <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                    <h1 class="cards-small-h1">Title</h1>
                    <h2 class="cards-small-h2"> 0 minutes reading</h2>
                </a>
            </div>
        </div>`;
    }
} else {
    strapiResponse.data.forEach((article) => {
        // IF CARD IMAGE HAS NOT BEEN LOADED
        if (article.attributes.CardImage.data === null) {
            docCardCollectionMobile.innerHTML +=
                `<div class="swiper-slide">
                    <div class="cards-small">
                        <a href="./article.html?${article.id}">
                            <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                            <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                            <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                        </a>
                    </div>
                </div>`;
        } else {
            const cardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollectionMobile.innerHTML +=
                `<div class="swiper-slide">
                    <div class="cards-small">
                        <a href="./article.html?${article.id}">
                            <div style="background: url('${cardImageURL}')" class="cards-small-img"></div>
                            <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                            <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                        </a>
                    </div>
                </div>`;
        }
    });
}
