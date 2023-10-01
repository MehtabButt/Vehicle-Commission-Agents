const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map'
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        asar: true,
        appId: 'vehicle-commission-agents',
        productName: 'Vehicle Commission Agents',
        extends: null,
        linux: {
          target: ['deb']
        }
      },
      mainProcessFile: 'src/background/main.js',
      rendererProcessFile: 'src/renderer/main.js'
    }
  }
});
