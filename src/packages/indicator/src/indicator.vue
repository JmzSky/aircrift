<template>
  <transition name="ui-indicator">
    <div class="ui-indicator" v-show="visible">
      <div class="ui-indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
        <fade-loader color="#fff" size="10" class="loading"></fade-loader>
        <span class="ui-indicator-text" v-show="text">{{ text }}</span>
      </div>
      <div class="ui-indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import {FadeLoader} from '../../spinner/index';
  export default {
    data() {
      return {
        visible: false
      };
    },

    components: {
      FadeLoader : FadeLoader
    },

    computed: {
      convertedSpinnerType() {
        switch (this.spinnerType) {
          case 'double-bounce':
            return 1;
          case 'triple-bounce':
            return 2;
          case 'fading-circle':
            return 3;
          default:
            return 0;
        }
      }
    },

    props: {
      text: String,
      spinnerType: {
        type: String,
        default: 'snake'
      }
    },
    watch: { 
      text(text){
        this.text = text;
      }
    },
  };
</script>


<style>
.loading{
   display: block;
   height: 30px;
   top: 10px;
   left: 48%;
   margin-bottom:5px;
}
.ui-indicator-enter,
.ui-indicator-leave-active {
  opacity: 0;
}
.ui-indicator {
  -webkit-transition: opacity .2s linear;
  transition: opacity .2s linear;
}
.ui-indicator-wrapper {
  top: 50%;
  left: 50%;
  position: fixed;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  z-index: 100;
}
.ui-indicator-text {
  display: block;
  color: #fff;
  text-align: center;
  margin-top: 10px;
  font-size: .3rem;
}
.ui-indicator-spin {
  display: inline-block;
  text-align: center;
}
.ui-indicator-mask {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0;
  background: transparent;
}
.ui-indicator-enter, .ui-indicator-leave-active {
  opacity: 0;
}
</style>

