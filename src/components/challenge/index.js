import Vue from 'vue';
import TemplateComponent from './index.vue'

const Follow = Vue.extend(TemplateComponent);
let instance;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new Follow({
        el: document.createElement('div'),
      });
    }
    instance.data = options

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
