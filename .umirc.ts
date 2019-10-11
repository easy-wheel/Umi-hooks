import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'umi_hooks',
        dll: true,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  routes: [
    {
      path: '/',
      component: '../layouts/index.tsx',
      routes: [
        {
          path: '/',
          name: '首页',
          exact: true,
          icon: 'home',
          component: './index.tsx',
        },
        {
          path: '/user',
          name: '用户',
          exact: true,
          icon: 'user',
          component: './user',
        },
        {
          path: '/form',
          name: '表单',
          exact: false,
          icon: 'form',
          routes: [
            {
              name: '基础表单',
              path: '/form/basicForm',
              exact: true,
              icon: 'form',
              component: './form/basicForm',
            },
            {
              name: '分步表单',
              path: '/form/stepForm',
              exact: true,
              icon: 'form',
              component: './form/stepForm',
            },
          ],
        },
        {
          path: '/chart',
          name: '图表',
          exact: true,
          icon: 'dot-chart',
          component: './chart',
        },
        {
          path: '/editor',
          name: '编辑器',
          exact: true,
          icon: 'edit',
          component: './editor',
        },
        {
          component: '404',
        },
      ],
    },
  ],
};

export default config;
