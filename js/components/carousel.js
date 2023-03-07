"use strict";

import { STRAPI_URL } from '../strapi-url.js';

const arrowBtnLeft = document.querySelector(".btn-arrow-left");
const arrowBtnRight = document.querySelector(".btn-arrow-right");

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

let curSlide = 0;

const strapiFetch = async () => {
    const cmsArrayArticles = await fetch(`${STRAPI_URL}/api/blogs?&pagination[limit]=3&sort[0]=CarouselPosition&sort[1]=DisplayInCarousel&sort[2]=Date&fields[0]=title&fields[1]=overscript&populate[BannerImage][fields][0]=url`)
        .then((res) => {
            return res.json();
        })
        .then((resJson) => {
            const cmsArrayArticles = resJson.data;
                    
            cmsArrayArticles.forEach((article, index) => {
                const BannerImageURL = article.attributes.BannerImage.data.attributes.url;
                document.querySelector('.slide-'+index).style.backgroundImage = `url(${BannerImageURL})`;
                document.querySelector('#slide-title-'+index).innerHTML = article.attributes.Title;
                document.querySelector('#slide-overscript-'+index).innerHTML = article.attributes.Overscript;
            });
        })
        .catch(err => {
            console.log(err);
        });

    return cmsArrayArticles;
}

const goToSlide = (slide) => {
    slides.forEach((s, i) => {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
};

const nextSlide = function () {
    curSlide === slides.length - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
};

const prevSlide = function () {
    curSlide === 0 ? (curSlide = slides.length - 1) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
};

const createDots = () => {
    slides.forEach((_, i) =>
        dotsContainer.insertAdjacentHTML(
            "beforeend",
            `<button class='dot' data-slide='${i}'></button>`
        )
    );
};

const activateDot = (slide) => {
    document
        .querySelectorAll(".dot")
        .forEach((dot) => dot.classList.remove("dot--active"));
    document
        .querySelectorAll(`.dot[data-slide="${slide}"]`)
        .forEach((dot) => dot.classList.add("dot--active"));
};

// inital
const init = async () => {
    goToSlide(0);
    createDots();
    activateDot(0);
};

init();
strapiFetch();

// event listeners
arrowBtnLeft.addEventListener("click", prevSlide);
arrowBtnRight.addEventListener("click", nextSlide);

dotsContainer.addEventListener("click", function (e) {
    // if needed to work only on dots and not on dot container
    if (e.target.classList.contains("dot")) {
        const { slide } = e.target.dataset;
        goToSlide(slide);
        activateDot(slide);
    }
});
