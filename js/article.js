import { STRAPI_URL } from './strapi-url.js';

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

// const STRAPI_URL = 'https://strapi-production-e9a2.up.railway.app';
const articleNumber = location.search.substring(1);

// Show by order
fetch(`${STRAPI_URL}/api/blogs?sort[0]=id&fields[0]=title`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        const showBlog = data.data[articleNumber].id;

        fetch(`${STRAPI_URL}/api/blogs/${showBlog}?populate=*`)
            .then(res => {
                return res.json();
            })
            .then(resJson => {
                const cmsBanner = resJson.data.attributes.BannerImage.data.attributes.formats.large.url;
                docImgBanner.style.backgroundImage = `url(${cmsBanner})`;

                docTitle.innerHTML = resJson.data.attributes.Title;
                docSubtitle01.innerHTML = resJson.data.attributes.Subtitle01;
                docSubtitle02.innerHTML = resJson.data.attributes.Subtitle02;
                docParagraph01.innerHTML = resJson.data.attributes.Paragraph01;
                docParagraph02.innerHTML = resJson.data.attributes.Paragraph02;
                docParagraph03.innerHTML = resJson.data.attributes.Paragraph03;
                docParagraph04.innerHTML = resJson.data.attributes.Paragraph04;

                const cmsImgContent = resJson.data.attributes.ContentImage.data.attributes.formats.large.url;
                docImgContent.style.backgroundImage = `url(${cmsImgContent})`;

                const cmsArrayTags = resJson.data.attributes.Tags.split(" ");

                cmsArrayTags.forEach(tag => {
                    docTags.innerHTML += `<h4>${tag}</h4>`;
                });
            })
            .catch(err => {
                console.log(err);
            });
    })

//Show by ID of <a src= '?##'></a>
// fetch(`${STRAPI_URL}/api/blogs/${articleNumber}?populate=*`)
//     .then((res) => {
//         return res.json();
//     })
//     .then((resJson) => {
//         const cmsBanner = resJson.data.attributes.BannerImage.data[0].attributes.formats.large.url;
//         const cmsTitle = resJson.data.attributes.Title;

//         docBanner.style.backgroundImage = `url(${cmsBanner})`;
//         docTitle.innerHTML = cmsTitle;

//     })
//     .catch(function () {
//         // handle the error
//     });

