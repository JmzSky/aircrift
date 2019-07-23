import Vue from "vue"

export const state = Vue.observable({
  active: null, //活动信息
  drawsnumber: 3, //活动抽奖次数
  appConfig: null, //系统配置信息
  userConfig: null, //用户配置信息
})

export const mutations = {
  setActive(v) {
    state.active = v
  },
  setDrawsnumber(v) {
    state.drawsnumber = v
  },
  setAppConfig(v) {
    state.appConfig = v
  },
  setUserConfig(v) {
    state.active = v.active
    state.userConfig = v
  }
}