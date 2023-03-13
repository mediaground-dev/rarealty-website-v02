import { fetchTags, fetchCardsByDate, fetchCardsByTag, fetchFillCardCollection } from "./utils/fetch-strapi.js";

const docTagTabMenu = document.querySelector('#tagTabMenu');
const docCardCollection = document.querySelector('#card-collection2');

// Variables fetch content cards
const pageSize = 6; // Numbers of cards of Latest News section
const pageOne = 1;

const tags = await fetchTags();

const renderCardCollection = (allTagsContent => {    
    allTagsContent.forEach((article, index) => {
        const imageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML +=
            `<a href="./article.html?${article.id}">
                <div class="card card-0${index + 1}">
                    <div style="background: url('${imageURL}')" class="card-img"></div>
                    <h3>${article.attributes.Overscript}</h3>
                    <h1>${article.attributes.Title}</h1>
                </div>
            </a>`;
    });
});

docTagTabMenu.innerHTML += `<div id="allTagsTab" tag="All" class="tag-tab tag-tab-selected">All</div>`;
tags.forEach(tag => {
    docTagTabMenu.innerHTML += `<div id="${tag.id}" class="tag-tab" tag="Tag01">${tag.attributes.TagName}</div>`;
});

const allTagsCardsContent = await fetchCardsByDate(pageSize, pageOne);
renderCardCollection(allTagsCardsContent);
sessionStorage.setItem(`AllTagsCardContent`, JSON.stringify(allTagsCardsContent));

tags.forEach( async tag => {
    const tagCardContent = await fetchCardsByTag(tag.id, pageSize, pageOne);
    sessionStorage.setItem(`tagCardContent-${tag.id}`, JSON.stringify(tagCardContent));

    // Fill Card Collection
    if (tagCardContent.length < pageSize) {
        const pageSizeFill = pageSize - tagCardContent.length;
        const articleIds = [];

        tagCardContent.forEach(article => {
            articleIds.push(article.id);
        })

        const othersArticleContent = await fetchFillCardCollection(articleIds, pageSizeFill);
        sessionStorage.setItem(`OtherCards-${tag.id}`, JSON.stringify(othersArticleContent));
    }
});

document.querySelectorAll('.tag-tab').forEach(docTagTab => {
    docTagTab.addEventListener('click', () => {

        docCardCollection.innerHTML = '';

        document.querySelector('.tag-tab-selected').classList.remove('tag-tab-selected');
        docTagTab.classList.add('tag-tab-selected');

        // Card Collection Latest News
        let tagCardContent;

        if (docTagTab.id === 'allTagsTab') {
            tagCardContent = JSON.parse(sessionStorage.getItem(`AllTagsCardContent`));
        } else {
            tagCardContent = JSON.parse(sessionStorage.getItem(`tagCardContent-${docTagTab.id}`));
        }

        renderCardCollection(tagCardContent);
        
        // Fill Card Collection
        const othersArticleContent = JSON.parse(sessionStorage.getItem(`OtherCards-${docTagTab.id}`));
        if (othersArticleContent !== null) {
            renderCardCollection(othersArticleContent);
        }
    });
});

