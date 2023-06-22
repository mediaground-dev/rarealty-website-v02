// const STRAPI_URL = 'https://strapi-production-74d1.up.railway.app';
// const STRAPI_URL = 'https://strapi-production-74wwd1.up.railway.app';
const STRAPI_URL = 'https://rarealty-strapi-v02-production.up.railway.app';

const STRAPI_TOKEN = 'b44ccdf57a60ebe2077f59b8d385c6d66de5a2c548cfd6563aa23b593a747222a737b6dfdd9272316adfd588c91782172f45dff6202dec6e74567c90fe11d71b7662d26fe73a84aed85156f2c5fccff3c010e300a0024601ef15e2628fdca64b678f356d0c39eca2a7508c2bd53059ec335d07d2f9299e0311e94e7bbcdeeb35';

// https://www.freecodecamp.org/news/how-to-use-environment-variables-in-vanillajs/

export const fetchCardsByDate = async (pageSize = 4, page = 1) => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort[0]=Date%3Adesc&fields[0]=title&fields[0]=Title&fields[1]=ReadingTime&populate[CardImage][fields][0]=url`,
        {
            headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
        })
        const resObject = await res.json();        
        return resObject;
    } catch (error) {
        console.log('STRAPI-ERROR', error);
        return false;
    }
};

export const fetchAreaNames = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/areas?sort[0]=Name&fields[0]=Name`,
        {
            headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
        });
        const resObject = await res.json();

        console.log(resObject)

        return resObject.data;
    } catch (error) {
        console.log('STRAPI-ERROR', error);
        return false;
    }
};

export const fetchAreaById = async (id) => {
    const res = await fetch(`${STRAPI_URL}/api/areas/${id}?populate[HighlightImage01][fields][0]=url&populate[HighlightImage02][fields][0]=url&populate[Articles][fields][0]=Title&populate[Articles][fields][0]=ReadingTime&populate[Articles][populate][CardImage][fields][0]=url`,
    {
        headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
    });
    const resObject = await res.json();

    return resObject.data;
};

export const fetchFillCardCollection = async (articleIds, pageSize = 4) => {
    let filterIds = '';

    articleIds.forEach((id, index) => {
        filterIds += `&filters[id][$notIn][${index}]=${id}`
    });

    const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[pageSize]=${pageSize}${filterIds}&fields[0]=Title&fields[1]=ReadingTime&populate[Articles][fields][0]=Title&populate[CardImage][fields][0]=url`,
    {
        headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
    });
    const resObject = await res.json();

    return resObject.data;
};

export const fetchCarouselContent = async (pageSize = 3) => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/blogs?pagination[pageSize]=${pageSize}&sort[0]=CarouselPosition&sort[1]=DisplayInCarousel&sort[2]=Date&fields[0]=title&fields[1]=overscript&populate[BannerImage][fields][0]=url`,
        {
            headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
        })
        const resObject = await res.json();
        return resObject.data;
    } catch (error) {
        console.log('STRAPI-ERROR', error);
        return false;
    }
};

export const fetchTags = async () => {
    try {
        const res = await fetch(`${STRAPI_URL}/api/tags?fields[0]=TagName`,
        {
            headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
        })
        const resObject = await res.json();
        return resObject.data;
    } catch (error) {
        console.log('STRAPI-ERROR', error);
        return false;
    }
};

export const fetchCardsByTag = async (tagId, pageSize = 4) => {
    const res = await fetch(`${STRAPI_URL}/api/tags?pagination[pageSize]=${pageSize}&filters[id]=${tagId}&populate[Articles][fields][0]=Title&populate[Articles][fields][1]=ReadingTime&populate[Articles][populate][CardImage][fields][0]=url`,
    {
        headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
    })
    const resObject = await res.json();

    return resObject.data[0].attributes.Articles.data;
};

export const fetchArticleById = async (articleId) => {
    const res = await fetch(`${STRAPI_URL}/api/blogs/${articleId}?populate[BannerImage][fields][0]=url&populate[BannerImage][fields][1]=caption&populate[ContentImage][fields][0]=url&populate[ContentImage][fields][1]=caption&populate[Tags][fields][3]=TagName&populate[Areas][fields][4]=Name`,
    {
        headers: {'Authorization': `Bearer ${STRAPI_TOKEN}`}
    })
    const articleObject = await res.json();
    return articleObject.data;
}
