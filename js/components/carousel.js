"use strict";

import { fetchCarouselContent } from "../utils/fetch-strapi.js";

const arrowBtnLeft = document.querySelector(".btn-arrow-left");
const arrowBtnRight = document.querySelector(".btn-arrow-right");

const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");

let curSlide = 0;

const strapiFetch = async () => {
    const cmsArrayArticles = await fetchCarouselContent();

    if (!cmsArrayArticles) {
        for (let index = 0; index < 3; index++) {
            document.querySelector('.slide-' + index).style.backgroundImage = "url('../../assets/images/img-error.png')";
            document.querySelector('.slide-' + index).style.backgroundSize = "140px 140px";
        }
    } else {
        cmsArrayArticles.forEach((article, index) => {
            const BannerImageURL = article.attributes.BannerImage.data.attributes.url;
            document.querySelector('.slide-' + index).style.backgroundImage = `url(${BannerImageURL})`;
        });

        document.querySelectorAll('.slide').forEach((element, index) => {
            element.innerHTML = `
                <a href="./article.html?${cmsArrayArticles[index].id}">
                    <h1 class="slide-title">${cmsArrayArticles[index].attributes.Title}</h1>
                </a>`;
        })

        // return cmsArrayArticles;
    }
};

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

const strapiFetchMobile = async () => {
    const cmsArrayArticles = await fetchCarouselContent();

    if (!cmsArrayArticles) {
        for (let index = 0; index < 3; index++) {
            document.querySelector('.slide-m-' + index).style.backgroundImage = "url('../../assets/images/img-error.png')";
            document.querySelector('.slide-m-' + index).style.backgroundSize = "140px 140px";
        }
    } else {
        cmsArrayArticles.forEach((article, index) => {
            const BannerImageURL = article.attributes.BannerImage.data.attributes.url;
            document.querySelector('.slide-m-' + index).style.backgroundImage = `url(${BannerImageURL})`;
        });

        document.querySelectorAll('.slide-m').forEach((element, index) => {
            element.innerHTML = `
                <a href="./article.html?${cmsArrayArticles[index].id}">
                    <h1 class="slide-title">${cmsArrayArticles[index].attributes.Title}</h1>
                </a>`;
        })
    }
};

strapiFetchMobile();
