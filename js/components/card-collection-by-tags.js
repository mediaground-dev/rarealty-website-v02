// import { fetchCardsByTag } from '../utils/fetch-strapi.js';

// const docCardCollection = document.querySelector('#card-collection');

// const docTag01 = document.querySelector('#Tag01');

// console.log(docTag01)

// const tag = docTag01.getAttribute('tag')

// console.log(tag)

// const strapiResponse = await fetchCardsByTag(tag);

// strapiResponse.forEach((article, index) => {
//     const CardImageURL = article.attributes.CardImage.data.attributes.url;
//     docCardCollection.innerHTML += `<div class="card-small">
//                                         <a href="./article.html?${index}">
//                                             <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
//                                             <h1>${article.attributes.Title}</h1>
//                                             <h2>${article.attributes.Overscript}</h2>
//                                         </a>
//                                     </div>`;
// });
