import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    //营销大转盘模块
    {path: '/', name:'', component: resolve => require(['../views/index'],resolve)},
  ]
})