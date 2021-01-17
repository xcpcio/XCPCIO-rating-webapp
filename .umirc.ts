import { defineConfig } from 'umi';
import CONFIG from './config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  title: false,
  metas: CONFIG.metas,
  analytics: CONFIG.analytics,
  hash: true,
  publicPath: CONFIG.publicPath,
  proxy: CONFIG.proxy,
});
