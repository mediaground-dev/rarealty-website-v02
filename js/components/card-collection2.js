import { STRAPI_URL } from '../strapi-url.js';

const docCardCollection2 = document.querySelector('#card-collection2');

fetch(`${STRAPI_URL}/api/blogs?sort[0]=id&fields[0]=title&fields[1]=tags&populate[CardImage][fields][0]=url&pagination[start]=0&pagination[limit]=6`)
    .then((res) => {
        return res.json();
    })
    .then((resJson) => {
        const cmsArrayArticles = resJson.data;
        cmsArrayArticles.forEach((article, index) => {
            const CardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollection2.innerHTML += `<div class="card card-0${index+1}">
                                                <div style="background: url('${CardImageURL}')" class="card-img"></div>
                                                <h3>${article.attributes.Tags}</h3>
                                                <h1><a href="./article.html?${index}">${article.attributes.Title}</a></h1>
                                             </div>`;
        });
    })
    .catch(err => {
        console.log(err);
    });
