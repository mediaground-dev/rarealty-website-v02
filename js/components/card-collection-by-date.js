import { fetchCardsByDate } from '../utils/fetch-strapi.js';

const docCardCollection = document.querySelector('#card-collection');

const strapiResponse = await fetchCardsByDate();

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
