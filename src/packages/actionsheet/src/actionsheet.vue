<template>
  <transition name="actionsheet-float">
    <div v-show="currentValue" class="ui-actionsheet">
      <ul class="ui-actionsheet-list" :style="{ 'margin-bottom': cancelText ? '5px' : '0' }">
        <li
          v-for="( item, index ) in actions"
          :key="index"
          class="ui-actionsheet-listitem"
          @click.stop="itemClick(item, index)"
        >{{ item.name }}</li>
      </ul>
      <a
        class="ui-actionsheet-button"
        @click.stop="currentValue = false"
        v-if="cancelText"
      >{{ cancelText }}</a>
    </div>
  </transition>
</template>

<script type="text/babel">
import Popup from "../../src/utils/popup/index";

export default {
  name: "UiActionsheet",

  mixins: [Popup],

  props: {
    modal: {
      default: true
    },

    modalFade: {
      default: false
    },

    lockScroll: {
      default: false
    },

    closeOnClickModal: {
      default: true
    },

    cancelText: {
      type: String,
      default: "取消"
    },

    actions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      currentValue: false
    };
  },

  watch: {
    currentValue(val) {
      this.$emit("input", val);
    },

    value(val) {
      this.currentValue = val;
    }
  },

  methods: {
    itemClick(item, index) {
      if (item.method && typeof item.method === "function") {
        item.method(item, index);
      }
      this.currentValue = false;
    }
  },

  mounted() {
    if (this.value) {
      this.rendered = true;
      this.currentValue = true;
      this.open();
    }
  }
};
</script>

<style>
.ui-actionsheet {
  position: fixed;
  background: #e0e0e0;
  width: 100%;
  text-align: center;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: -webkit-transform 0.3s ease-out;
  transition: -webkit-transform 0.3s ease-out;
  transition: transform 0.3s ease-out;
  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out;
}
.ui-actionsheet-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.ui-actionsheet-listitem {
  border-bottom: solid 1px #e0e0e0;
}
.ui-actionsheet-listitem,
.ui-actionsheet-button {
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  color: #333;
  background-color: #fff;
}
.ui-actionsheet-listitem:active,
.ui-actionsheet-button:active {
  background-color: #f0f0f0;
}
.actionsheet-float-enter,
.actionsheet-float-leave-active {
  -webkit-transform: translate3d(-50%, 100%, 0);
  transform: translate3d(-50%, 100%, 0);
}

.actionsheet-float-enter,
.actionsheet-float-leave-active {
  transform: translate3d(-50%, 100%, 0);
}
</style>
