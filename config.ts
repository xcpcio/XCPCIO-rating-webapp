export const config = {
    title: 'Rating - XCPCIO',
    favicon: '/favicon.png',
    publicPath: '/',
    analytics: {
        ga: '',
        baidu: '',
    },
    metas: [
        {
            name: 'keywords',
            content: 'icpc, ccpc, rating',
        },
        {
            name: 'description',
            content: 'XCPCIO-Rating 主要收录 *CPC 系列竞赛的 Rating 排行榜。',
        },
    ],
    proxy: {},
    dataHost:
        'https://cdn.jsdelivr.net/gh/XCPCIO/XCPCIO-rating-data@2021.5.17/',
};

export default config;
