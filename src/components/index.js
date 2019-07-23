import Vue from 'vue'
import Active from './active/index'
import challenge from './challenge/index'

//添加活动模板
Vue.component(Active.name, Active);

let doData = function(data,val){
  Object.keys(val).forEach(function(key) {
    if(val[key]){
      data[key] = val[key];
    }
  })
  return data
}

/**
 * 挑战成功
 * @param {*} value 
 */
let Challenge = function(value={}){
  var data = {
    type : 1,
    userimg: 'http://10.0.4.19/marketing/images/mole/manImg.jpg',
  }
  var config = doData(data,value)
  challenge.open(config);
}

export default {
  Active,
  Challenge,
}
