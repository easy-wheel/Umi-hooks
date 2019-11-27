import { IConfig } from 'umi-types';
import { resolve } from 'path';
import webpackPlugin from './plugin.config';
const webpackConfig = require('./webpack.config');
const outputDir = process.env.UMI_ENV == 'test' ? 'dist-test' : 'dist';
console.log('环境变量', process.env.UMI_ENV);
// ref: https://umijs.org/config/
const config: IConfig = {
  // 应用程序将部署的base URL
  // 编译打包后的输出目录
  outputPath: outputDir,
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
        chunks: ['vendors', 'antdesigns', 'visualization', 'umi'],
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
  proxy: {
    '/api': {
      target: '', // 转发地址
      changeOrigin: true,
      // pathRewrite: { '^/api/v1/weather': '/v3/weather' },
    },
  },
  define: {
    'process.env.BASE_URL': '', // 开发环境请求api地址
  },
  chainWebpack(config, { webpack }) {
    config.optimization.splitChunks({
      chunks: 'async',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|lodash|lodash-decorators|redux-saga|re-select|dva|moment)[\\/]/,
          priority: -10,
        },
        antdesigns: {
          name: 'antdesigns',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
          priority: -11,
        },
        visualization: {
          name: 'visualization',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](bizcharts|bizcharts-plugin-slider|@antv_data-set)[\\/]/,
          priority: -12,
        },
      },
    });
  },
  // chainWebpack(config, { webpack }) {
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
  //       {
  //         //  可以是`server`，`static`或`disabled`。
  //         //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
  //         //  在“静态”模式下，会生成带有报告的单个HTML文件。
  //         //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
  //         analyzerMode: 'server',
  //         //  将在“服务器”模式下使用的主机启动HTTP服务器。
  //         analyzerHost: '127.0.0.1',
  //         //  将在“服务器”模式下使用的端口启动HTTP服务器。
  //         analyzerPort: 8866,
  //         //  路径捆绑，将在`static`模式下生成的报告文件。
  //         //  相对于捆绑输出目录。
  //         reportFilename: 'report.html',
  //         //  模块大小默认显示在报告中。
  //         //  应该是`stat`，`parsed`或者`gzip`中的一个。
  //         //  有关更多信息，请参见“定义”一节。
  //         defaultSizes: 'parsed',
  //         //  在默认浏览器中自动打开报告
  //         openAnalyzer: true,
  //         //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
  //         generateStatsFile: false,
  //         //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
  //         //  相对于捆绑输出目录。
  //         statsFilename: 'stats.json',
  //         //  stats.toJson（）方法的选项。
  //         //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
  //         //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
  //         statsOptions: null,
  //         logLevel: 'info',
  //       },
  //     ]);
  // },
  alias: {
    // api: resolve(__dirname, './src/services/'),
    // components: resolve(__dirname, './src/components'),
    // config: resolve(__dirname, './src/utils/config'),
    // models: resolve(__dirname, './src/models'),
    // routes: resolve(__dirname, './src/routes'),
    // services: resolve(__dirname, './src/services'),
    // themes: resolve(__dirname, './src/themes'),
    // utils: resolve(__dirname, './src/utils'),
  },
};

export default config;
