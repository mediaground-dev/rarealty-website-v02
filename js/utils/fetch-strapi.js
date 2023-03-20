const STRAPI_URL = 'https://strapi-production-e9a2.up.railway.app';

export const fetchCardsByDate = async (pageSize = 4, page = 1) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=Date%3Adesc&fields[0]=title&fields[0]=Title&fields[1]=ReadingTime&populate[CardImage][fields][0]=url`)
    const resObject = await res.json();
    
    return resObject;
};

export const fetchAreaNames = async () => {
    const res = await fetch(`${STRAPI_URL}/api/areas?sort[0]=Name&fields[0]=Name`);
    const resObject = await res.json();

    return resObject.data;
};

export const fetchAreaById = async (id) => {
    const res = await fetch(`${STRAPI_URL}/api/areas/${id}?populate[HighlightImage01][fields][0]=url&populate[HighlightImage02][fields][0]=url&populate[Articles][fields][0]=Title&populate[Articles][fields][0]=Overscript&populate[Articles][populate][CardImage][fields][0]=url`);
    const resObject = await res.json();

    return resObject.data;
};

export const fetchFillCardCollection = async (articleIds, pageSize = 4) => {
    let filterIds = '';

    articleIds.forEach( (id, index) => {
        filterIds += `&filters[id][$notIn][${index}]=${id}`
    });

    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[pageSize]=${pageSize}${filterIds}&fields[0]=Title&fields[1]=ReadingTime&populate[Articles][fields][0]=Title&populate[CardImage][fields][0]=url`);
    const resObject = await res.json();

    return resObject.data;
};

export const fetchCarouselContent = async (pageSize = 3) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[pageSize]=${pageSize}&sort[0]=CarouselPosition&sort[1]=DisplayInCarousel&sort[2]=Date&fields[0]=title&fields[1]=overscript&populate[BannerImage][fields][0]=url`)
    const resObject = await res.json();

    return resObject.data;
};

export const fetchTags = async () => {
    const res = await fetch(`${STRAPI_URL}/api/tags?fields[0]=TagName`)
    const resObject = await res.json();

    return resObject.data;
};

export const fetchCardsByTag = async (tagId, pageSize = 4) => {
    const res = await fetch(`${STRAPI_URL}/api/tags?pagination[pageSize]=${pageSize}&filters[id]=${tagId}&populate[Articles][fields][0]=Title&populate[Articles][fields][1]=ReadingTime&populate[Articles][populate][CardImage][fields][0]=url`)
    const resObject = await res.json();

    return resObject.data[0].attributes.Articles.data;
};

export const fetchArticleById = async (articleId) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs/${articleId}?populate[BannerImage][fields][0]=url&populate[BannerImage][fields][1]=caption&populate[ContentImage][fields][0]=url&populate[ContentImage][fields][1]=caption&populate[Tags][fields][3]=TagName&populate[Areas][fields][4]=Name`)
    const articleObject = await res.json();
    
    return articleObject.data;
}
