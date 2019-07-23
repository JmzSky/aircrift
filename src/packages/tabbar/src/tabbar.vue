<template>
  <div class="ui-tabbar" :class="{
      'is-fixed': fixed
    }">
    <slot></slot>
  </div>
</template>

<script>
/**
 * UiTabbar
 * @module components/tabbar
 * @desc 底部 tab，依赖 tab-item
 * @param {boolean} [fixed=false] - 固定底部
 * @param {*} value - 返回 item component 传入的 id
 *
 * @example
 * <UiTabbar v-model="selected">
 *   <mt-tab-item id="订单">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </UiTabbar>
 *
 * <UiTabbar v-model="selected" fixed>
 *   <mt-tab-item :id="['传入数组', '也是可以的']">
 *     <img slot="icon" src="http://placehold.it/100x100">
 *     <span slot="label">订单</span>
 *   </mt-tab-item>
 * </UiTabbar>
 */
export default {
  name: 'UiTabbar',

  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="scss">
.ui-tabbar {
  background-image: -webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  position: relative;
  background-color: #fafafa;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
  text-align: center;
}
.ui-tabbar > .ui-tab-item.is-selected {
  // background-color: #eaeaea;
  color: $color;
}
.ui-tabbar > .ui-tab-item.is-selected i{
  color: $color;
}
.ui-tabbar.is-fixed {
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: 1;
}

.ui-tab-item {
  display: block;
  padding: 7px 0;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
  text-decoration: none
}
.ui-tab-item-icon {
  width: 24px;
  height: 24px;
  margin: 0 auto 5px
}
.ui-tab-item-icon:empty {
  display: none
}
.ui-tab-item-icon > * {
  display: block;
  width: 100%;
  height: 100%
}
.ui-tab-item-label {
  color: inherit;
  font-size: 12px;
  line-height: 1
}

.ui-tab-container-item {
  -ms-flex-negative: 0;
      flex-shrink: 0;
  width: 100%
}

.ui-tab-container {
  overflow: hidden;
  position: relative;
}
.ui-tab-container .swipe-transition {
  -webkit-transition: -webkit-transform 150ms ease-in-out;
  transition: -webkit-transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
}
.ui-tab-container-wrap {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
</style>
