import { fetchAreaById, fetchAreaNames, fetchCardsByTag, fetchFillCardCollection } from "./utils/fetch-strapi.js";

const docAreaTabMenu = document.querySelector('#areaTabMenu');
const docAreaSelectedContent = document.querySelector('#areaSelectedContent');
const docCardCollection = document.querySelector('#card-collection');

const areaNames = await fetchAreaNames();

areaNames.forEach((area, index) => {
    if (index === 0) {
        docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab area-tab-selected">${area.attributes.Name}</div>`;
    } else {
        docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab">${area.attributes.Name}</div>`;
    }
});

const areaFirstContent = await fetchAreaById(areaNames[0].id);

const renderAreaContent = (areaContent) => {
    const {
        AreaTitle,
        HighlightTitle01,
        HighlightTitle02,
        HighlightTitle03,
        HighlightTitle04,
        HighlightParagraph01,
        HighlightParagraph02,
        HighlightParagraph03,
        HighlightParagraph04
    } = areaContent.attributes;

    const HighlightImage01 = areaContent.attributes.HighlightImage01.data.attributes.url;
    const HighlightImage02 = areaContent.attributes.HighlightImage02.data.attributes.url;

    docAreaSelectedContent.innerHTML =
        `<div class="block-00 block-selected">
            <h1>${AreaTitle}</h1>
            <div class="img-with-text2">
                <div class="content">
                    <h2>${HighlightTitle01}</h2>
                    <p>${HighlightParagraph01}</p>
                    <h2>${HighlightTitle02}</h2>
                    <p>${HighlightParagraph02}</p>
                </div>
                <div class="image" style="background: url('${HighlightImage01}')"></div>
            </div>

            <div class="img-with-text2">
                <div class="image" style="background: url('${HighlightImage02}')"></div>
                <div class="content">
                    <h2>${HighlightTitle03}</h2>
                    <p>${HighlightParagraph03}</p>
                    <h2>${HighlightTitle04}</h2>
                    <p>${HighlightParagraph04}</p>
                </div>
            </div>
        </div>`;
};

const renderCardCollection = (areaArticlesContent) => {
    areaArticlesContent.forEach((article) => {
        const imageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += 
            `<div class="card-small">
                <a href="./article.html?${article.id}">
                <div style="background: url('${imageURL}')" class="card-small-img"></div>
                <h1>${article.attributes.Title}</h1>
                <h2>${article.attributes.Overscript}</h2>
                </a>
            </div>`;
    });
};

renderAreaContent(areaFirstContent);

const areaArticlesContent = areaFirstContent.attributes.Articles.data;
renderCardCollection(areaArticlesContent);

// Fill Card Collection
if (areaArticlesContent.length < 4) {
    const pageSize = 4 - areaArticlesContent.length;
    const articleIds = [];

    areaArticlesContent.forEach(article => {
        articleIds.push(article.id);
    })

    const othersArticleContent =  await fetchFillCardCollection(articleIds, pageSize);

    renderCardCollection(othersArticleContent);
}  

document.querySelectorAll('.area-tab').forEach(docAreaTab => {
    docAreaTab.addEventListener('click', async () => {
        docAreaSelectedContent.innerHTML = '';
        docCardCollection.innerHTML = '';

        document.querySelector('.area-tab-selected').classList.remove('area-tab-selected');
        docAreaTab.classList.add('area-tab-selected');

        const areaContent = await fetchAreaById(docAreaTab.id);
        renderAreaContent(areaContent);

        const areaArticlesContent = areaContent.attributes.Articles.data;
        renderCardCollection(areaArticlesContent);

        // Fill Card Collection
        if (areaArticlesContent.length < 4) {
            const pageSize = 4 - areaArticlesContent.length;
            const articleIds = [];

            areaArticlesContent.forEach(article => {
                articleIds.push(article.id);
            })

            const othersArticleContent =  await fetchFillCardCollection(articleIds, pageSize);

            renderCardCollection(othersArticleContent);
        }  
    });
});
