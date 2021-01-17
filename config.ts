export const config = {
  title: 'Rating - XCPCIO',
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
  proxy: {
    '/data': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
    },
  },
};

export default config;
