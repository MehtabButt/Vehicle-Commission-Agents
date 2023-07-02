const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: "source-map",
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        appId: "client.app",
        productName: "client",
      },
      mainProcessFile: "src/background.js",
      preload: "src/preload.js",
    },
  },
});
