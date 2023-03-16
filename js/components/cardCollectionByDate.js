import { fetchCardsByDate } from '../utils/fetch-strapi.js';

const docCardCollection = document.querySelector('#card-collection');

const strapiResponse = await fetchCardsByDate();

console.log(strapiResponse)

strapiResponse.data.forEach((article) => {
    const CardImageURL = article.attributes.CardImage.data.attributes.url;
    docCardCollection.innerHTML += `<div class="cards-small">
                                        <a href="./article.html?${article.id}">
                                            <div style="background: url('${CardImageURL}')" class="cards-small-img"></div>
                                            <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                                            <h2 class="cards-small-h2">${article.attributes.Overscript}</h2>
                                        </a>
                                    </div>`;
});
