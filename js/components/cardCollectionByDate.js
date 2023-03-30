import { fetchCardsByDate } from '../utils/fetch-strapi.js';

const docCardCollection = document.querySelector('#card-collection');

const strapiResponse = await fetchCardsByDate();

if (!strapiResponse) {
    for (let index = 0; index < 4; index++) {
        docCardCollection.innerHTML += `<div class="cards-small">
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
            docCardCollection.innerHTML += 
                `<div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        } else {
            const cardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollection.innerHTML += 
                `<div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('${cardImageURL}')" class="cards-small-img"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        }        
    });
}
