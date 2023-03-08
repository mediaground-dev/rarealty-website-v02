import { STRAPI_URL } from '../strapi-url.js';

export const fetchCardsByDate = async (pageSize = 4, page = 1) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=Date%3Adesc&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url`)
    const articleObject = await res.json();
    
    return articleObject.data;
};

export const fetchCardsByTag = async (tag, pageSize = 4, page = 1) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url`)
    const articleObject = await res.json();

    return articleObject.data;
};

export const fetchArticleById = async (articleId) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs/${articleId}?populate=*`)
    const articleData = await res.json();

    return articleData.data;
}
