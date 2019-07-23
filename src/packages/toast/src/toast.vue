<template>
  <transition name="ui-toast-pop">
    <div class="ui-toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
      <i class="iconfont iconClass" :class="iconClass" v-if="iconClass !== ''"></i>
      <span class="ui-toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
    </div>
  </transition>
</template>

<script type="text/babel">
  export default {
    props: {
      message: String,
      className: {
        type: String,
        default: ''
      },
      position: {
        type: String,
        default: 'middle'
      },
      iconClass: {
        type: String,
        default: 'iconsuccess_no_circle'
      }
    },

    data() {
      return {
        visible: false
      };
    },

    computed: {
      customClass() {
        var classes = [];
        switch (this.position) {
          case 'top':
            classes.push('is-placetop');
            break;
          case 'bottom':
            classes.push('is-placebottom');
            break;
          default:
            classes.push('is-placemiddle');
        }
        classes.push(this.className);

        return classes.join(' ');
      }
    }
  };
</script>

<style lang="scss">
.ui-toast {
  position: fixed;
  max-width: 80%;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  box-sizing: border-box;
  text-align: center;
  z-index: 1000;
  -webkit-transition: opacity .3s linear;
  transition: opacity .3s linear
}
.ui-toast.is-placebottom {
  bottom: 50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0)
}
.ui-toast.is-placemiddle {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%)
}
.ui-toast.is-placetop {
  top: 50px;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
          transform: translate(-50%, 0)
}
.ui-toast-icon {
  display: block;
  text-align: center;
  font-size: 56px
}
.ui-toast-text {
  font-size: 14px;
  display: block;
  text-align: center;
  color: #fff;
}
.ui-toast-pop-enter, .ui-toast-pop-leave-active {
  opacity: 0
}
.iconClass{
  font-size: .5rem;
  color:#fff;
}
</style>