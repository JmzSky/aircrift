<template>
  <label class="ui-switch">
    <input class="ui-switch-input" :disabled="disabled" @change="$emit('change', currentValue)" type="checkbox" v-model="currentValue">
    <span class="ui-switch-core"></span>
    <div class="ui-switch-label"><slot></slot></div>
  </label>
</template>

<script>
/**
 * UiSwitch
 * @module components/switch
 * @desc 切换按钮
 * @param {boolean} [value] - 绑定值，支持双向绑定
 * @param {slot} - 显示内容
 *
 * @example
 * <UiSwitch v-model="value"></UiSwitch>
 */
export default {
  name: 'UiSwitch',

  props: {
    value: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
};
</script>

<style lang="scss">
.ui-switch {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  position: relative;
}
.ui-switch * {
  pointer-events: none;
}
.ui-switch-label {
  margin-left: 10px;
  display: inline-block;
}
.ui-switch-label:empty {
  margin-left: 0;
}
.ui-switch-core {
  display: inline-block;
  position: relative;
  width: 52px;
  height: 32px;
  border: 1px solid #d9d9d9;
  border-radius: 16px;
  box-sizing: border-box;
  background: #d9d9d9;
}
.ui-switch-core::after, .ui-switch-core::before {
  content: " ";
  top: 0;
  left: 0;
  position: absolute;
  -webkit-transition: -webkit-transform .3s;
  transition: -webkit-transform .3s;
  transition: transform .3s;
  transition: transform .3s, -webkit-transform .3s;
  border-radius: 15px;
}
.ui-switch-core::after {
  width: 30px;
  height: 30px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .4);
}
.ui-switch-core::before {
  width: 50px;
  height: 30px;
  background-color: #fdfdfd;
}
.ui-switch-input {
  display: none;
}
.ui-switch-input:checked + .ui-switch-core {
  border-color: $background;
  background-color: $background;
}
.ui-switch-input:checked + .ui-switch-core::before {
  -webkit-transform: scale(0);
          transform: scale(0);
}
.ui-switch-input:checked + .ui-switch-core::after {
  -webkit-transform: translateX(20px);
          transform: translateX(20px);
}

</style>
