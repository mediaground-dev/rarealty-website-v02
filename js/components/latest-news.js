import { fetchCardsByDate, fetchCardsByTag } from "../utils/fetch-strapi.js";

const docTabAll = document.querySelector('#TabAll');

const docCardCollection = document.querySelector('#card-collection2');

docCardCollection.innerHTML = '';
const pageSize = 6;

const renderCollectionByTag = async (strapiResponse) => {
    docCardCollection.innerHTML = '';
    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<a href="./article.html?${article.id}">
                                            <div class="card card-0${index + 1}">
                                                <div style="background: url('${CardImageURL}')" class="card-img"></div>
                                                <h3>${article.attributes.Tags}</h3>
                                                <h1>${article.attributes.Title}</h1>
                                            </div>
                                        </a>`;
    });
};

const strapiResponse = await fetchCardsByDate(pageSize);
renderCollectionByTag(strapiResponse);

docTabAll.addEventListener('click', async () => {
    document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
    docTabAll.classList.add('latest-menu-selected');

    const strapiResponse = await fetchCardsByDate(pageSize);
    renderCollectionByTag(strapiResponse);

    document.querySelector('#btnMoreNews').style.display = "block";
})

document.querySelectorAll('.tag-menu-tab').forEach(element => {
    element.addEventListener('click', async () => {
        document.querySelector('.latest-menu-selected').classList.remove('latest-menu-selected');
        element.classList.add('latest-menu-selected');

        const tag = element.getAttribute('tag');
        const strapiResponse = await fetchCardsByTag(tag, pageSize);
        renderCollectionByTag(strapiResponse);
    })
});

document.querySelector('#btnMoreNews').addEventListener('click', async () => {
    const strapiResponse = await fetchCardsByDate(pageSize, 2);

    strapiResponse.forEach((article, index) => {
        const CardImageURL = article.attributes.CardImage.data.attributes.url;
        docCardCollection.innerHTML += `<a href="./article.html?${article.id}">
                                            <div class="card card-0${index + 1}">
                                                <div style="background: url('${CardImageURL}')" class="card-img"></div>
                                                <h3>${article.attributes.Tags}</h3>
                                                <h1>${article.attributes.Title}</h1>
                                            </div>
                                        </a>`;
    });

    document.querySelector('#btnMoreNews').style.display = "none";
});

//TODO
// docViewMoreBtn.addEventListener('click', () => {
//     const tag = docTabSelected.getAttribute('tag'); => docTabSelected be css selected class
//     renderCollectionByTag(tag);
// })



// TODO sacar el boton view-more si son menos de tantos articulos