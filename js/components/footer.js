import { fetchAreaNames } from "../utils/fetch-strapi.js";

const docFooterAreaLinks = document.querySelector('#footer-area-links');

const areaNames = await fetchAreaNames();

areaNames.forEach(area => {
    docFooterAreaLinks.innerHTML += `
        <a href="./areas.html?${area.id}#section-areas">${area.attributes.Name}</a>
    `;
});
