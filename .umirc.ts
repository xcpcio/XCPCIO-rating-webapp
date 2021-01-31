import { defineConfig } from 'umi';
import CONFIG from './config';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        {
            path: '/',
            component: '@/pages/index',
            exact: true,
        },
        {
            path: '/:id',
            component: '@/pages/rating',
            exact: true,
        },
    ],
    title: false,
    metas: CONFIG.metas,
    analytics: CONFIG.analytics,
    hash: true,
    favicon: CONFIG.favicon,
    publicPath: CONFIG.publicPath,
    proxy: CONFIG.proxy,
});
