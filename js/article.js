import { fetchArticleById, fetchCardsByTag } from './utils/fetch-strapi.js';

const docImgBanner = document.querySelector('#section-banner-img');
const docTitle = document.querySelector('#article-title');
const docSubtitle01 = document.querySelector('#article-subtitle01');
const docSubtitle02 = document.querySelector('#article-subtitle02');
const docParagraph01 = document.querySelector('#article-p01');
const docParagraph02 = document.querySelector('#article-p02');
const docParagraph03 = document.querySelector('#article-p03');
const docParagraph04 = document.querySelector('#article-p04');
const docImgContent = document.querySelector('#section-content-img');
const docTags = document.querySelector('#article-tags');

const articleId = location.search.substring(1);

const articleData = await fetchArticleById(articleId);

const cmsBanner = articleData.attributes.BannerImage.data.attributes.formats.large.url;

docImgBanner.style.backgroundImage = `url(${cmsBanner})`;

docTitle.innerHTML = articleData.attributes.Title;
docSubtitle01.innerHTML = articleData.attributes.Subtitle01;
docSubtitle02.innerHTML = articleData.attributes.Subtitle02;
docParagraph01.innerHTML = articleData.attributes.Paragraph01;
docParagraph02.innerHTML = articleData.attributes.Paragraph02;
docParagraph03.innerHTML = articleData.attributes.Paragraph03;
docParagraph04.innerHTML = articleData.attributes.Paragraph04;

const cmsImgContent = articleData.attributes.ContentImage.data.attributes.formats.large.url;
docImgContent.style.backgroundImage = `url(${cmsImgContent})`;

const cmsArrayTags = articleData.attributes.Tags.split(" ");

let numberOfTags;

cmsArrayTags.forEach((tag, index) => {
    docTags.innerHTML += `<h4 id="Tag0${index + 1}" class="tag" tag="${tag}">${tag}</h4>`;
    numberOfTags = index + 1;
});


// Related News Section //
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

const docCardCollection = document.querySelector('#card-collection');
const docTag01 = document.querySelector('#Tag01');

docTag01.classList.add('tag-tab-selected');

const tag01 = docTag01.getAttribute('tag');
const strapiResponse = await fetchCardsByTag(tag01, 4);

cardRender(strapiResponse);

// Add on click event that fetch news related to tag //
document.querySelectorAll('.tag').forEach(element => {
    element.addEventListener('click', async () => {
        document.querySelector('.tag-tab-selected').classList.remove('tag-tab-selected');
        element.classList.add('tag-tab-selected');

        const tag = element.getAttribute('tag');
        const strapiResponse = await fetchCardsByTag(tag, 4);

        docCardCollection.innerHTML = '';

        cardRender(strapiResponse);
    });
});
