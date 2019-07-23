<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="ui-tab-container-item">
    <slot></slot>
  </div>
</template>

<script>
/**
 * UiTabContainerItem
 * @desc 搭配 tab-container 使用
 * @module components/tab-container-item
 *
 * @param {number|string} [id] - 该项的 id
 *
 * @example
 * <mt-tab-container v-model="selected">
 *   <UiTabContainerItem id="1"> 内容A </UiTabContainerItem>
 *   <UiTabContainerItem id="2"> 内容B </UiTabContainerItem>
 *   <UiTabContainerItem id="3"> 内容C </UiTabContainerItem>
 * </mt-tab-container>
 */
export default {
  name: 'UiTabContainerItem',

  props: ['id']
};
</script>

<style>

</style>
