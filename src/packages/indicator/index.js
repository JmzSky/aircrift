import Vue from 'vue';
import IndicatorComponent from './src/indicator.vue'

const Indicator = Vue.extend(IndicatorComponent);
let instance;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new Indicator({
        el: document.createElement('div'),
      });
    }
    instance.text = typeof options === 'string' ? options : options.text || '';
    instance.spinnerType = options.spinnerType || 'snake';
    if (instance.visible) return;
    
    instance.vm = instance.$mount()
		document.body.appendChild(instance.vm.$el)

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};
