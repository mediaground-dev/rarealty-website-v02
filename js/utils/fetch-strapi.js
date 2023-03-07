import { STRAPI_URL } from '../strapi-url.js';

export const fetchCardsByDate = async (limit = 4) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[limit]=${limit}&sort[0]=Date%3Adesc&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url`)
    const articleObject = await res.json();
    
    return articleObject.data;
};

export const fetchCardsByTag = async (tag, limit = 4) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[limit]=${limit}&filters[tags][$contains]=${tag}&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url`)
    const articleObject = await res.json();

    return articleObject.data;
};

export const fetchArticleById = async (articleId) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs/${articleId}?populate=*`)
    const articleData = await res.json();

    return articleData.data;
}
