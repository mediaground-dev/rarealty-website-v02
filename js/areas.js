import { fetchAreaById, fetchAreaNames, fetchFillCardCollection } from "./utils/fetch-strapi.js";

const docAreaTabMenu = document.querySelector('#areaTabMenu');
const docAreaSelectedContent = document.querySelector('#areaSelectedContent');
const docCardCollection = document.querySelector('#card-collection');

const renderAreaContentFake = () => {
    docAreaSelectedContent.innerHTML =
        `<h1 class="area-title">AreaTitle</h1>
        <div class="areas-block">
            <div class="areas-img-text mb-80">
                <div class="content">
                    <h2>HighlightTitle01</h2>
                    <p>HighlightParagraph01</p>
                    <h2>HighlightTitle02</h2>
                    <p>HighlightParagraph02</p>
                </div>
                <div 
                    class="areas-image" 
                    style=
                        "background: url('../../assets/images/img-error.png');
                         background-size: 140px 140px !important;
                         background-color: rgb(170, 170, 170)"
                ></div>
            </div>
            
            <div class="areas-img-text mb-80">
                <div 
                    class="areas-image" 
                    style=
                        "background: url('../../assets/images/img-error.png');
                         background-size: 140px 140px !important;
                         background-color: rgb(170, 170, 170)"
                ></div>
                <div class="content">
                    <h2>HighlightTitle01</h2>
                    <p>HighlightParagraph01</p>
                    <h2>HighlightTitle02</h2>
                    <p>HighlightParagraph02</p>
                </div>
            </div>
        </div>`;
};

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

    // const HighlightImage01 = areaContent.attributes.HighlightImage01.data.attributes.url;
    // const HighlightImage02 = areaContent.attributes.HighlightImage02.data.attributes.url;

   
     docAreaSelectedContent.innerHTML =
       `<h1 class="area-title">${AreaTitle}</h1>
        <div class="areas-block">
            <div id="area-content-block-01" class="areas-img-text mb-80">
                <div  class="content">
                    <h2>${HighlightTitle01}</h2>
                    <p>${HighlightParagraph01}</p>
                    <h2>${HighlightTitle02}</h2>
                    <p>${HighlightParagraph02}</p>
                </div>
            </div>

            <div id="area-content-block-02" class="areas-img-text">
                <div class="content">
                    <h2>${HighlightTitle03}</h2>
                    <p>${HighlightParagraph03}</p>
                    <h2>${HighlightTitle04}</h2>
                    <p>${HighlightParagraph04}</p>
                </div>
            </div>
        </div>`;

    if(areaContent.attributes.HighlightImage01.data === null) {
        const imgDiv = document.createElement("div");
        imgDiv.className = 'areas-image'
        imgDiv.style.backgroundImage =  'url(../../assets/images/img-error.png)';
        imgDiv.style.backgroundSize  =  '140px 140px';
        imgDiv.style.backgroundColor =  'rgb(170, 170, 170';
       
        document.querySelector('#area-content-block-01').appendChild(imgDiv);
    } else {
        const HighlightImage01 = areaContent.attributes.HighlightImage01.data.attributes.url;
        const imgDiv = document.createElement("div");
        imgDiv.className = 'areas-image'
        imgDiv.style.backgroundImage =  `url('${HighlightImage01}')`;
        imgDiv.style.backgroundSize =  'cover';
       
        document.querySelector('#area-content-block-01').appendChild(imgDiv);
    }
    
    if(areaContent.attributes.HighlightImage02.data === null) {
        const imgDiv = document.createElement("div");
        imgDiv.className = 'areas-image'
        imgDiv.style.backgroundImage =  'url(../../assets/images/img-error.png)';
        imgDiv.style.backgroundSize  =  '140px 140px';
        imgDiv.style.backgroundColor =  'rgb(170, 170, 170';
       
        const secondDivBlock = document.querySelector('#area-content-block-02');
        secondDivBlock.insertBefore(imgDiv, secondDivBlock.firstChild);
    } else {
        const HighlightImage02 = areaContent.attributes.HighlightImage02.data.attributes.url;
        const imgDiv = document.createElement("div");
        imgDiv.className = 'areas-image'
        imgDiv.style.backgroundImage =  `url('${HighlightImage02}')`;

        const secondDivBlock = document.querySelector('#area-content-block-02');
        secondDivBlock.insertBefore(imgDiv, secondDivBlock.firstChild);
    }
};

const renderCardCollection = (areaCardsContent) => {
    areaCardsContent.forEach(article => {
        // IF CARD IMAGE HAS NOT BEEN LOADED
        if (article.attributes.CardImage.data === null) {
            docCardCollection.innerHTML +=
                `<div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        } else {
            const cardImageURL = article.attributes.CardImage.data.attributes.url;
            docCardCollection.innerHTML +=
                `<div class="cards-small">
                    <a href="./article.html?${article.id}">
                        <div style="background: url('${cardImageURL}')" class="cards-small-img"></div>
                        <h1 class="cards-small-h1">${article.attributes.Title}</h1>
                        <h2 class="cards-small-h2">${article.attributes.ReadingTime} minutes reading</h2>
                    </a>
                </div>`;
        }
    });
};

const renderFakeCardCollection = () => {
    for (let index = 0; index < 4; index++) {
        docCardCollection.innerHTML +=
            `<div class="cards-small">
                <a>
                    <div style="background: url('../../assets/images/img-error.png');" class="cards-small-img-error"></div>
                    <h1 class="cards-small-h1">Title</h1>
                    <h2 class="cards-small-h2"> 0 minutes reading</h2>
                </a>
            </div>`;
    }
};

//---- AREAS MENU TAB ----//
const areaNames = await fetchAreaNames();

if (!areaNames) {
    docAreaTabMenu.innerHTML += `<div id="0" class="area-tab area-tab-selected btn-navbar-ra">Areas Not Found</div>`;

    renderAreaContentFake();
    renderFakeCardCollection();
} else {
    const areaSelectedId = location.search.substring(1);

    //---- FILL AREAS MENU TAB ----//
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

    // Store in Session the content of the other Areas
    areaNames.forEach(async area => {
        const areaContent = await fetchAreaById(area.id);
        sessionStorage.setItem(`AreaContent-${area.id}`, JSON.stringify(areaContent));

        // Fill Card Collection
        // const areaCardsContent = areaContent.attributes.Articles.data;

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

    //---- AREA SELECTED CONTENT ----//
    const areaFirstContent = await fetchAreaById(areaNames[0].id);
    renderAreaContent(areaFirstContent);

    //---- AREA CARD RELATED CONTENT ----//
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

            console.log(areaCardsContent)
            renderCardCollection(areaCardsContent);

            // Fill Card Collection
            // const othersArticleContent = JSON.parse(sessionStorage.getItem(`OtherCards-${docAreaTab.id}`));
            // if (othersArticleContent !== null) {
            //     renderCardCollection(othersArticleContent);
            // }
        });
    });
}

// //---- AREA SELECTED CONTENT ----//
// const areaFirstContent = await fetchAreaById(areaNames[0].id);
// renderAreaContent(areaFirstContent);

// //---- AREA CARD RELATED CONTENT ----//
// const areaCardsContent = areaFirstContent.attributes.Articles.data;
// renderCardCollection(areaCardsContent);

// // Fill Card Collection
// // if (areaCardsContent.length < 4) {
// //     const pageSize = 4 - areaCardsContent.length;
// //     const articleIds = [];

// //     areaCardsContent.forEach(article => {
// //         articleIds.push(article.id);
// //     })

// //     const othersArticleContent = await fetchFillCardCollection(articleIds, pageSize);
// //     renderCardCollection(othersArticleContent);
// // }

// document.querySelectorAll('.area-tab').forEach(docAreaTab => {
//     docAreaTab.addEventListener('click', () => {
//         docAreaSelectedContent.innerHTML = '';
//         docCardCollection.innerHTML = '';

//         document.querySelector('.area-tab-selected').classList.remove('area-tab-selected');
//         docAreaTab.classList.add('area-tab-selected');

//         const areaContent = JSON.parse(sessionStorage.getItem(`AreaContent-${docAreaTab.id}`));
//         renderAreaContent(areaContent);

//         // Card Collection Related News
//         const areaCardsContent = areaContent.attributes.Articles.data;
//         renderCardCollection(areaCardsContent);

//         // Fill Card Collection
//         // const othersArticleContent = JSON.parse(sessionStorage.getItem(`OtherCards-${docAreaTab.id}`));
//         // if (othersArticleContent !== null) {
//         //     renderCardCollection(othersArticleContent);
//         // }
//     });
// });
