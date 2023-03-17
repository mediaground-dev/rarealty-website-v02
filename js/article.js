import { fetchArticleById, fetchCardsByTag, fetchCardsByDate } from './utils/fetch-strapi.js';

const docImgBanner     = document.querySelector('#article-banner-img');
const docCaptionBanner = document.querySelector('#article-banner-caption');

const docTags  = document.querySelector('#article-tags');
const docTitle = document.querySelector('#article-title');
const docIntro = document.querySelector('#article-intro');

const docDate  = document.querySelector('#article-date');
const docReadingTime = document.querySelector('#article-time');

const docSubtitle01  = document.querySelector('#article-subtitle01');
const docSubtitle02  = document.querySelector('#article-subtitle02');

const docParagraph01 = document.querySelector('#article-p01');
const docParagraph02 = document.querySelector('#article-p02');
const docParagraph03 = document.querySelector('#article-p03');
const docParagraph04 = document.querySelector('#article-p04');

const docImgContent     = document.querySelector('#article-content-img');
const docCaptionContent = document.querySelector('#article-content-caption');

const articleId = location.search.substring(1);

const articleContent = await fetchArticleById(articleId);

const cmsBannerURL     = articleContent.attributes.BannerImage.data.attributes.url;
const cmsBannerCaption = articleContent.attributes.BannerImage.data.attributes.caption;

const cmsArrayTags = articleContent.attributes.Tags.data;
cmsArrayTags.forEach(tag => {
    docTags.innerHTML += `<div id="tag.id">${tag.attributes.TagName}</div>`;
});

docImgBanner.style.backgroundImage = `url(${cmsBannerURL})`;
docCaptionBanner.innerHTML = cmsBannerCaption;

docTitle.innerHTML =  articleContent.attributes.Title;
docIntro.innerHTML =  articleContent.attributes.Intro;

docDate.innerHTML  = `Published on ${articleContent.attributes.Date}`;
docReadingTime.innerHTML = `${articleContent.attributes.ReadingTime} minutes reading`;

docSubtitle01.innerHTML  = articleContent.attributes.Subtitle01;
docSubtitle02.innerHTML  = articleContent.attributes.Subtitle02;
docParagraph01.innerHTML = articleContent.attributes.Paragraph01;
docParagraph02.innerHTML = articleContent.attributes.Paragraph02;
docParagraph03.innerHTML = articleContent.attributes.Paragraph03;
docParagraph04.innerHTML = articleContent.attributes.Paragraph04;

const cmsContentURL     = articleContent.attributes.ContentImage.data.attributes.url;
const cmsContentCaption = articleContent.attributes.ContentImage.data.attributes.caption;

docImgContent.style.backgroundImage = `url(${cmsContentURL})`;
docCaptionContent.innerHTML = cmsContentCaption;


// Related News Section //
const docCardCollection = document.querySelector('#card-collection');

const cardRender = (strapiResponse) => {
    // console.log(strapiResponse)
    strapiResponse.data.forEach((article, index) => {
    //     const CardImageURL = article.attributes.CardImage.data.attributes.url;
    //     docCardCollection.innerHTML += 
    //         `<div class="card-small">
    //             <a href="./article.html?${index}">
    //                 <div style="background: url('${CardImageURL}')" class="card-small-img"></div>
    //                 <h1>${article.attributes.Title}</h1>
    //                 <h2>${article.attributes.Overscript}</h2>
    //             </a>
    //         </div>`;
    // });

    // areaCardsContent.forEach(article => {
        const imageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML +=
            `<div class="cards-small">
                <a href="./article.html?${article.id}">
                    <div style="background: url('${imageURL}')" class="cards-small-img" loading="lazy"></div>
                    <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                    <h2 class="cards-small-h2">${article.attributes.Overscript}</h2>
                </a>
            </div>`;
    });
};

const strapiResponse = await fetchCardsByDate();
cardRender(strapiResponse);

// const docTag01 = document.querySelector('#Tag01');
// docTag01.classList.add('tag-tab-selected');
// const tag01 = docTag01.getAttribute('tag');
// const strapiResponse = await fetchCardsByTag(tag01, 4);



// Add on click event that fetch news related to tag //
// document.querySelectorAll('.tag').forEach(element => {
//     element.addEventListener('click', async () => {
//         document.querySelector('.tag-tab-selected').classList.remove('tag-tab-selected');
//         element.classList.add('tag-tab-selected');

//         const tag = element.getAttribute('tag');
//         const strapiResponse = await fetchCardsByTag(tag, 4);

//         docCardCollection.innerHTML = '';

//         cardRender(strapiResponse);
//     });
// });
