import { fetchTags, fetchCardsByDate, fetchCardsByTag, fetchFillCardCollection } from "./utils/fetch-strapi.js";

const docTagTabMenu = document.querySelector('#tagTabMenu');
const docCardCollection = document.querySelector('#card-collection2');
const btnMoreNews = document.querySelector('#btnMoreNews');

// Variables fetch content cards
const pageSize = 6; // Numbers of cards of Latest News section
const pageOne = 1;
const pageTwo = 2;

const renderCardCollection = (allTagsContent => {
    allTagsContent.forEach((article, index) => {
        const imageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML +=
            `<a href="./article.html?${article.id}">
                <div class="card card-0${index + 1}">
                    <div style="background: url('${imageURL}')" class="card-img"></div>
                    <h1>${article.attributes.Title}</h1>
                    <h3 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h3>
                </div>
            </a>`;
    });
});

docTagTabMenu.innerHTML += `<div id="allTagsTab" tag="All" class="tag-tab tag-tab-selected btn-navbar-ra">All</div>`;

const tags = await fetchTags();

tags.forEach(tag => {
    docTagTabMenu.innerHTML += `<div id="${tag.id}" class="tag-tab btn-navbar-ra" tag="Tag01">${tag.attributes.TagName}</div>`;
});

const allTagsCardsContent = await fetchCardsByDate(pageSize, pageOne);

console.log(allTagsCardsContent)

renderCardCollection(allTagsCardsContent.data);
sessionStorage.setItem(`AllTagsCardContent`, JSON.stringify(allTagsCardsContent));

if (allTagsCardsContent.meta.pagination.pageCount > 1) {
    btnMoreNews.style.display = 'flex';

    const allTagsCardsContent2 = await fetchCardsByDate(pageSize, pageTwo);
    sessionStorage.setItem(`AllTagsCardContent2`, JSON.stringify(allTagsCardsContent2));

    btnMoreNews.addEventListener('click', () => {
        renderCardCollection(allTagsCardsContent2.data);
        btnMoreNews.style.display = 'none';
    });
}

// Fetch Strapi and save in session storage
tags.forEach(async tag => {
    const tagCardContent = await fetchCardsByTag(tag.id, pageSize, pageOne);
    sessionStorage.setItem(`tagCardContent-${tag.id}`, JSON.stringify(tagCardContent));

    // If cards are more than 6, fetch second page of cards
    if (tagCardContent.length > pageSize) {
        const tagCardContent2 = await fetchCardsByTag(tag.id, pageSize, pageTwo);
        sessionStorage.setItem(`tagCardContent-${tag.id}-p2`, JSON.stringify(tagCardContent2));
    }

    // If cards are less than 6, fetch others card by date to fill
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

        let tagCardContent;

        if (docTagTab.id === 'allTagsTab') {
            tagCardContent = JSON.parse(sessionStorage.getItem(`AllTagsCardContent`));
            renderCardCollection(tagCardContent.data);

            if (tagCardContent.meta.pagination.pageCount > 1) {
                btnMoreNews.style.display = 'block';
            }

        } else {
            tagCardContent = JSON.parse(sessionStorage.getItem(`tagCardContent-${docTagTab.id}`));
            renderCardCollection(tagCardContent);

            btnMoreNews.style.display = 'none';

            if (tagCardContent.length > pageSize) {
                btnMoreNews.style.display = 'block';
                btnMoreNews.addEventListener('click', () => {
                    const tagCardContent2 = JSON.parse(sessionStorage.getItem(`tagCardContent-${docTagTab.id}-p2`));
                    renderCardCollection(tagCardContent2);
                    btnMoreNews.style.display = 'none';
                });
            }
        }

        // Fill Card Collection
        const othersArticleContent = JSON.parse(sessionStorage.getItem(`OtherCards-${docTagTab.id}`));
        if (othersArticleContent !== null) {
            renderCardCollection(othersArticleContent);
        }
    });
});

