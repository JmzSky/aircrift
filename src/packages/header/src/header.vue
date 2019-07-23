<template>
  <header
    class="ui-header"
    :class="{ 'is-fixed': fixed }">
    <div class="ui-header-button is-left">
      <slot name="left"></slot>
    </div>
    <h1 class="ui-header-title" v-text="title"></h1>
    <div class="ui-header-button is-right">
      <slot name="right"></slot>
    </div>
  </header>
</template>

<script>
/**
 * UiHeader
 * @module components/header
 * @desc 顶部导航
 * @param {boolean} [fixed=false] - 固定顶部
 * @param {string} [title] - 标题
 * @param {slot} [left] - 显示在左侧区域
 * @param {slot} [right] - 显示在右侧区域
 *
 * @example
 * <UiHeader title="我是标题" fixed>
 *   <UiButton slot="left" icon="back" @click="handleBack">返回</UiButton>
 *   <UiButton slot="right" icon="more"></mt-button>
 * </UiHeader>
 */
export default {
  name: 'UiHeader',

  props: {
    fixed: Boolean,
    title: String
  }
};
</script>

<style lang="scss">
.ui-header {
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  background-color: $background;
  box-sizing: border-box;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 14px;
  height: 40px;
  line-height: 1;
  padding: 0 10px;
  position: relative;
  text-align: center;
  white-space: nowrap;
}
.ui-header .ui-button {
  background-color: transparent;
  border: 0;
  box-shadow: none;
  color: inherit;
  display: inline-block;
  padding: 0;
  font-size: inherit
}
.ui-header .ui-button::after {
  content: none;
}
.ui-header.is-fixed {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
}
.ui-header-button {
  -webkit-box-flex: .5;
      -ms-flex: .5;
          flex: .5;
}
.ui-header-button > a {
  color: inherit;
}
.ui-header-button.is-right {
  text-align: right;
  color:#fff;
}
.ui-header-button.is-left {
  text-align: left;
  color:#fff;
}
.ui-header-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: inherit;
  font-weight: 400;
  color:#fff;
  -webkit-box-flex: 1;
      -ms-flex: 1;
          flex: 1;
}
</style>
