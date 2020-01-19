const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/v-intersect/'
    : '/',

  configureWebpack: {
    entry: {
      app: path.resolve(__dirname, './docs-src/main.js'),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './docs-src'),
      },
    },
  },

  chainWebpack: (config) => {
    config
      .entry('app')
      .clear()
      .add('./docs-src/main.js')
      .end();
    config.resolve.alias
      .set('@', path.join(__dirname, './docs-src'));
  },
};
