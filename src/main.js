// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './static/style/index.css'
Vue.config.productionTip = false

//通用组件模块
import * as Packages from './packages/index'
Vue.use(Packages)

//数据模块
import lib from './static/libs/index'
Vue.prototype.$api = lib.core
Vue.prototype.$util = lib.utils
Vue.prototype.$service = lib.service

//配置AiagainUI模块
import comm from './components/index'
Vue.prototype.$comm = comm

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole();


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')