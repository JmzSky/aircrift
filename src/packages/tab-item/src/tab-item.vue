<template>
  <a class="ui-tab-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="ui-tab-item-icon"><slot name="icon"></slot></div>
    <div class="ui-tab-item-label"><slot></slot></div>
  </a>
</template>

<script>
/**
 * UiTabItem
 * @module components/tab-item
 * @desc 搭配 tabbar 或 navbar 使用
 * @param {*} id - 选中后的返回值，任意类型
 * @param {slot} [icon] - icon 图标
 * @param {slot} - 文字
 *
 * @example
 * <UiTabItem>
 *   <img slot="icon" src="http://placehold.it/100x100">
 *   订单
 * </UiTabItem>
 */
export default {
  name: 'UiTabItem',

  props: ['id']
};
</script>

<style lang="css">

</style>
