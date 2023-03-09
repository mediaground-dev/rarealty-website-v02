const STRAPI_URL = 'https://strapi-production-e9a2.up.railway.app';

export const fetchCardsByDate = async (pageSize = 4, page = 1) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=Date%3Adesc&fields[0]=title&fields[1]=overscript&populate[CardImage][fields][0]=url`)
    const articleObject = await res.json();
    
    return articleObject.data;
};

export const fetchAreaNames = async () => {
    const res = await fetch(`${STRAPI_URL}/api/areas?fields[0]=Name`);
    const articleObject = await res.json();

    return articleObject.data;
};

export const fetchAreaById = async (id) => {
    const res = await fetch(`${STRAPI_URL}/api/areas/${id}?populate[HighlightImage01][fields][0]=url&populate[HighlightImage02][fields][0]=url&populate[Articles][fields][0]=Title&populate[Articles][fields][0]=Overscript&populate[Articles][populate][CardImage][fields][0]=url`);
    const articleObject = await res.json();

    return articleObject.data;
};

export const fetchFillCardCollection = async (articleIds, pageSize = 4) => {
    let filterIds = '';

    articleIds.forEach( (id, index) => {
        filterIds += `&filters[id][$notIn][${index}]=${id}`
    });

    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[pageSize]=${pageSize}${filterIds}&fields[0]=Title&fields[0]=Overscript&populate[Articles][fields][0]=Title&populate[CardImage][fields][0]=url`);
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
