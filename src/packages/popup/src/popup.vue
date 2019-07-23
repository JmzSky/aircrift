<template>
  <transition :name="currentTransition">
    <div class="cpm" v-show="currentValue">
      <div class="ui-popup" :class="[position ? 'ui-popup-' + position : '']">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from '../../src/utils/popup';
  import Vue from 'vue';

  export default {
    name: 'UiPopup',

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

      popupTransition: {
        type: String,
        default: 'popup-slide'
      },

      position: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        currentValue: false,
        currentTransition: this.popupTransition
      };
    },

    watch: {
      currentValue(val) {
        this.$emit('input', val);
      },

      value(val) {
        this.currentValue = val;
      }
    },

    beforeMount() {
      if (this.popupTransition !== 'popup-fade') {
        this.currentTransition = `popup-slide-${ this.position }`;
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

<style lang="scss">
  .popup-slide-top-enter,
  .popup-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }

  .popup-slide-right-enter,
  .popup-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
  }

  .popup-slide-bottom-enter,
  .popup-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }

  .popup-slide-left-enter,
  .popup-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
  }

  .popup-fade-enter,
  .popup-fade-leave-active {
    opacity: 0;
  }
  .cpm{
    position: fixed;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .4);
    top: 0;
    display: block;
    z-index: 600;
    overflow-y: auto;
    overscroll-behavior: contain;
    -weblit-overscroll-behavior: contain;
  }
  .ui-popup {
    position: fixed;
    background: #fff;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
            transform: translate3d(-50%, -50%, 0);
    -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
    -webkit-transition: .2s ease-out;
    transition: .2s ease-out;
    width:101%;
  }
.ui-popup-top {
  top: 0;
  right: auto;
  bottom: auto;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
          transform: translate3d(-50%, 0, 0);
}
.ui-popup-right {
  top: 50%;
  right: 0;
  bottom: auto;
  left: auto;
  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
}
.ui-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
          transform: translate3d(-50%, 0, 0);
}
.ui-popup-left {
  top: 50%;
  right: auto;
  bottom: auto;
  left: 0;
  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
}
.popup-slide-top-enter, .popup-slide-top-leave-active {
  -webkit-transform: translate3d(-50%, -100%, 0);
          transform: translate3d(-50%, -100%, 0);
}
.popup-slide-right-enter, .popup-slide-right-leave-active {
  -webkit-transform: translate3d(100%, -50%, 0);
          transform: translate3d(100%, -50%, 0);
}
.popup-slide-bottom-enter, .popup-slide-bottom-leave-active {
  -webkit-transform: translate3d(-50%, 100%, 0);
          transform: translate3d(-50%, 100%, 0);
}
.popup-slide-left-enter, .popup-slide-left-leave-active {
  -webkit-transform: translate3d(-100%, -50%, 0);
          transform: translate3d(-100%, -50%, 0);
}
.popup-fade-enter, .popup-fade-leave-active {
  opacity: 0;
}
.popup-header{
  width:100%;
  height: .8rem;
  line-height: .8rem;
  display: flex;
  justify-content: space-between;
  padding:0 .3rem;
  box-sizing: border-box;  
  -webkit-box-sizing:border-box;
  color:$color;
  font-size: .3rem;
  border-bottom: 1px solid #ebedf0;
}
.popup-header span{
  color:$color;
}
</style>