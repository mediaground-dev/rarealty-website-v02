import { fetchAreaById, fetchAreaNames, fetchFillCardCollection } from "./utils/fetch-strapi.js";

const docAreaTabMenu = document.querySelector('#areaTabMenu');
const docAreaSelectedContent = document.querySelector('#areaSelectedContent');
const docCardCollection = document.querySelector('#card-collection');

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

const renderCardCollection = (areaCardsContent) => {
    areaCardsContent.forEach(article => {
        const imageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML +=
            `<div class="cards-small">
                <a href="./article.html?${article.id}">
                    <div style="background: url('${imageURL}')" class="cards-small-img" loading="lazy"></div>
                    <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                    <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                </a>
            </div>`;
    });
};

const areaNames = await fetchAreaNames();
const areaSelectedId = location.search.substring(1);

if (areaSelectedId === '') {
    areaNames.forEach((area, index) => {
        if (index === 0) {
            docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab area-tab-selected btn-navbar-ra">${area.attributes.Name}</div>`;
        } else {
            docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab btn-navbar-ra">${area.attributes.Name}</div>`;
        }
    });
} else {
    areaNames.forEach(area => {
        if (areaSelectedId == area.id) {
            docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab area-tab-selected btn-navbar-ra">${area.attributes.Name}</div>`;
        } else {
            docAreaTabMenu.innerHTML += `<div id="${area.id}" class="area-tab btn-navbar-ra">${area.attributes.Name}</div>`;
        }
    });
}

const areaFirstContent = await fetchAreaById(areaNames[0].id);
renderAreaContent(areaFirstContent);

const areaCardsContent = areaFirstContent.attributes.Articles.data;
renderCardCollection(areaCardsContent);

// Fill Card Collection
// if (areaCardsContent.length < 4) {
//     const pageSize = 4 - areaCardsContent.length;
//     const articleIds = [];

//     areaCardsContent.forEach(article => {
//         articleIds.push(article.id);
//     })

//     const othersArticleContent = await fetchFillCardCollection(articleIds, pageSize);
//     renderCardCollection(othersArticleContent);
// }

// Store in Session the content of the other Areas
areaNames.forEach(async area => {
    const areaContent = await fetchAreaById(area.id);
    sessionStorage.setItem(`AreaContent-${area.id}`, JSON.stringify(areaContent));

    const areaCardsContent = areaContent.attributes.Articles.data;

    // Fill Card Collection
    // if (areaCardsContent.length < 4) {
    //     const pageSize = 4 - areaCardsContent.length;
    //     const articleIds = [];

    //     areaCardsContent.forEach(article => {
    //         articleIds.push(article.id);
    //     })

    //     const othersArticleContent = await fetchFillCardCollection(articleIds, pageSize);
    //     sessionStorage.setItem(`OtherCards-${area.id}`, JSON.stringify(othersArticleContent));
    // }
});

document.querySelectorAll('.area-tab').forEach(docAreaTab => {
    docAreaTab.addEventListener('click', () => {
        docAreaSelectedContent.innerHTML = '';
        docCardCollection.innerHTML = '';

        document.querySelector('.area-tab-selected').classList.remove('area-tab-selected');
        docAreaTab.classList.add('area-tab-selected');

        const areaContent = JSON.parse(sessionStorage.getItem(`AreaContent-${docAreaTab.id}`));
        renderAreaContent(areaContent);

        // Card Collection Related News
        const areaCardsContent = areaContent.attributes.Articles.data;
        renderCardCollection(areaCardsContent);

        // Fill Card Collection
        // const othersArticleContent = JSON.parse(sessionStorage.getItem(`OtherCards-${docAreaTab.id}`));
        // if (othersArticleContent !== null) {
        //     renderCardCollection(othersArticleContent);
        // }
    });
});
