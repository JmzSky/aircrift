<template>
  <div class="ui-range" :class="{ 'ui-range-disabled': disabled }">
    <slot name="start"></slot>
    <div class="ui-range-content" ref="content">
      <div class="ui-range-runway" :style="{ 'border-top-width': barHeight + 'px' }"></div>
      <div class="ui-range-progress" :style="{ width: progress + '%', height: barHeight + 'px' }"></div>
      <div class="ui-range-thumb" ref="thumb" :style="{ left: progress + '%' }"></div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<script type="text/babel">
  import draggable from './draggable';
  export default {
    name: 'UiRange',
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: Number
      },
      barHeight: {
        type: Number,
        default: 1
      }
    },

    computed: {
      progress() {
        const value = this.value;
        if (typeof value === 'undefined' || value === null) return 0;
        return Math.floor((value - this.min) / (this.max - this.min) * 100);
      }
    },

    mounted() {
      const thumb = this.$refs.thumb;
      const content = this.$refs.content;

      const getThumbPosition = () => {
        const contentBox = content.getBoundingClientRect();
        const thumbBox = thumb.getBoundingClientRect();
        return {
          left: thumbBox.left - contentBox.left,
          top: thumbBox.top - contentBox.top,
          thumbBoxLeft: thumbBox.left
        };
      };

      let dragState = {};
      draggable(thumb, {
        start: (event) => {
          if (this.disabled) return;
          const position = getThumbPosition();
          const thumbClickDetalX = event.clientX - position.thumbBoxLeft;
          dragState = {
            thumbStartLeft: position.left,
            thumbStartTop: position.top,
            thumbClickDetalX: thumbClickDetalX
          };
        },
        drag: (event) => {
          if (this.disabled) return;
          const contentBox = content.getBoundingClientRect();
          const deltaX = event.pageX - contentBox.left - dragState.thumbStartLeft - dragState.thumbClickDetalX;
          const stepCount = Math.ceil((this.max - this.min) / this.step);
          const newPosition = (dragState.thumbStartLeft + deltaX) - (dragState.thumbStartLeft + deltaX) % (contentBox.width / stepCount);

          let newProgress = newPosition / contentBox.width;

          if (newProgress < 0) {
            newProgress = 0;
          } else if (newProgress > 1) {
            newProgress = 1;
          }

          this.$emit('input', Math.round(this.min + newProgress * (this.max - this.min)));
        },
        end: () => {
          if (this.disabled) return;
          this.$emit('change', this.value);
          dragState = {};
        }
      });
    }
  };
</script>
<style lang="scss">
.ui-range {
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 30px;
    line-height: 30px
}
.ui-range > * {
    display: -ms-flexbox;
    display: flex;
    display: -webkit-box
}
.ui-range *[slot=start] {
    margin-right: 5px
}
.ui-range *[slot=end] {
    margin-left: 5px
}
.ui-range-content {
    position: relative;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    margin-right: 30px
}
.ui-range-runway {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    left: 0;
    right: -30px;
    border-top-color: #a9acb1;
    border-top-style: solid
}
.ui-range-thumb {
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    cursor: move;
    box-shadow: 0 1px 3px rgba(0,0,0,.4)
}
.ui-range-progress {
    position: absolute;
    display: block;
    background-color: $background;
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    width: 0
}
.ui-range-disabled {
    opacity: 0.5
}
</style>