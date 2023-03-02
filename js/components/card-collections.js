import { STRAPI_URL } from '../strapi-url.js';

const docCardCollection = document.querySelector('#card-collection');

fetch(`${STRAPI_URL}/api/blogs?sort[0]=id&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url&pagination[start]=0&pagination[limit]=4`)
    .then((res) => {
        return res.json();
    })
    .then((resJson) => {
        const cmsArrayArticles = resJson.data;

        console.log(cmsArrayArticles)

        cmsArrayArticles.forEach((article, index) => {
            const CardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollection.innerHTML += `<div class="card-small">
                                                <a href="./article.html?${index}">
                                                    <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
                                                    <h1>${article.attributes.Title}</h1>
                                                    <h2>${article.attributes.Overscript}</h2>
                                                </a>
                                            </div>`;
        });
    })
    .catch(err => {
        console.log(err);
    });
