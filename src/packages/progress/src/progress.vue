<template>
  <div class="ui-progress">
    <slot name="start"></slot>
    <div class="ui-progress-content">
      <div class="ui-progress-runway" :style="{ height: barHeight + 'px' }"></div>
      <div class="ui-progress-progress" :style="{ width: value + '%', height: barHeight + 'px' }"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'UiProgress',

    props: {
      value: Number,
      barHeight: {
        type: Number,
        default: 3
      }
    }
  };
</script>
<style>
  
</style>