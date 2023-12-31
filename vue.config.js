const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:4000/',
        pathRewrite:{'^/api':''}
      }
    }
  }
})
