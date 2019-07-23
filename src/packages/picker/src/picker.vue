<template>
  <div class="picker" :class="{ 'picker-3d': rotateEffect }">
    <div class="picker-toolbar" v-if="showToolbar"><slot></slot></div>
    <div class="picker-items">
      <picker-slot v-for="(slot,key) in slots" :key="key" :valueKey="valueKey" :values="slot.values || []" :text-align="slot.textAlign || 'center'" :visible-item-count="visibleItemCount" :class-name="slot.className" :flex="slot.flex" v-model="values[slot.valueIndex]" :rotate-effect="rotateEffect" :divider="slot.divider" :content="slot.content" :itemHeight="itemHeight" :default-index="slot.defaultIndex"></picker-slot>
      <div class="picker-center-highlight" :style="{ height: itemHeight + 'px', marginTop: -itemHeight / 2 + 'px' }"></div>
    </div>
  </div>
</template>

<script type="text/babel">
  import PickerSlot from './picker-slot.vue';
  export default {
    components: {
      PickerSlot: PickerSlot
    },
    name: 'UiPicker',
    componentName: 'picker',
    props: {
      slots: {
        type: Array
      },
      showToolbar: {
        type: Boolean,
        default: false
      },
      visibleItemCount: {
        type: Number,
        default: 5
      },
      valueKey: String,
      rotateEffect: {
        type: Boolean,
        default: false
      },
      itemHeight: {
        type: Number,
        default: 36
      }
    },
    created() {
      this.$on('slotValueChange', this.slotValueChange);
      this.slotValueChange();
    },

    methods: {
      slotValueChange() {
        this.$emit('change', this, this.values);
      },

      getSlot(slotIndex) {
        var slots = this.slots || [];
        var count = 0;
        var target;
        var children = this.$children.filter(child => child.$options.name === 'picker-slot');

        slots.forEach(function(slot, index) {
          if (!slot.divider) {
            if (slotIndex === count) {
              target = children[index];
            }
            count++;
          }
        });

        return target;
      },
      getSlotValue(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.currentValue;
        }
        return null;
      },
      setSlotValue(index, value) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.currentValue = value;
        }
      },
      getSlotValues(index) {
        var slot = this.getSlot(index);
        if (slot) {
          return slot.mutatingValues;
        }
        return null;
      },
      setSlotValues(index, values) {
        var slot = this.getSlot(index);
        if (slot) {
          slot.mutatingValues = values;
        }
      },
      getValues() {
        return this.values;
      },
      setValues(values) {
        var slotCount = this.slotCount;
        values = values || [];
        if (slotCount !== values.length) {
          throw new Error('values length is not equal slot count.');
        }
        values.forEach((value, index) => {
          this.setSlotValue(index, value);
        });
      }
    },

    computed: {
      values: {
        get() {
          var slots = this.slots || [];
          var values = [];
          var valueIndexCount = 0;
          slots.forEach(slot => {
            if (!slot.divider) {
              slot.valueIndex = valueIndexCount++;
              values[slot.valueIndex] = (slot.values || [])[slot.defaultIndex || 0];
            }
          });
          return values;
        }
      },
      slotCount() {
        var slots = this.slots || [];
        var result = 0;
        slots.forEach(function(slot) {
          if (!slot.divider) result++;
        });
        return result;
      }
    },
  };
</script>

<style>
  .picker {
    overflow: hidden;
  }

  .picker-toolbar {
    height: 40px;
  }

  .picker-items {
    display: flex;
    justify-content: center;
    padding: 0;
    text-align: right;
    font-size: 24px;
    position: relative;
  }

  .picker-center-highlight {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    top: 50%;
    margin-top: -18px;
    pointer-events: none
  }

  .picker-center-highlight:before,
  .picker-center-highlight:after {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #eaeaea;
    display: block;
    z-index: 15;
    transform: scaleY(0.5);
  }

  .picker-center-highlight:before {
    left: 0;
    top: 0;
    bottom: auto;
    right: auto;
  }

  .picker-center-highlight:after {
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
  }
  .picker {
  overflow: hidden;
}
.picker-toolbar {
  height: 40px;
}
.picker-items {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  padding: 0;
  text-align: right;
  font-size: 24px;
  position: relative;
}
.picker-center-highlight {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  width: 100%;
  top: 50%;
  margin-top: -18px;
  pointer-events: none
}
.picker-center-highlight:before, .picker-center-highlight:after {
  content: '';
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #eaeaea;
  display: block;
  z-index: 15;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
.picker-center-highlight:before {
  left: 0;
  top: 0;
  bottom: auto;
  right: auto;
}
.picker-center-highlight:after {
  left: 0;
  bottom: 0;
  right: auto;
  top: auto;
}

.picker-slot {
  font-size: 18px;
  overflow: hidden;
  position: relative;
  max-height: 100%
}
.picker-slot.picker-slot-left {
  text-align: left;
}
.picker-slot.picker-slot-center {
  text-align: center;
}
.picker-slot.picker-slot-right {
  text-align: right;
}
.picker-slot.picker-slot-divider {
  color: #000;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center
}
.picker-slot-wrapper {
  -webkit-transition-duration: 0.3s;
          transition-duration: 0.3s;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.picker-slot-wrapper.dragging, .picker-slot-wrapper.dragging .picker-item {
  -webkit-transition-duration: 0s;
          transition-duration: 0s;
}
.picker-item {
  height: 36px;
  line-height: 36px;
  padding: 0 10px;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #707274;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-transition-duration: .3s;
          transition-duration: .3s;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.picker-slot-absolute .picker-item {
  position: absolute;
}
.picker-item.picker-item-far {
  pointer-events: none
}
.picker-item.picker-selected {
  color: #000;
  -webkit-transform: translate3d(0, 0, 0) rotateX(0);
          transform: translate3d(0, 0, 0) rotateX(0);
}
.picker-3d .picker-items {
  overflow: hidden;
  -webkit-perspective: 700px;
          perspective: 700px;
}
.picker-3d .picker-item, .picker-3d .picker-slot, .picker-3d .picker-slot-wrapper {
  -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d
}
.picker-3d .picker-slot {
  overflow: visible
}
.picker-3d .picker-item {
  -webkit-transform-origin: center center;
          transform-origin: center center;
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
  -webkit-transition-timing-function: ease-out;
          transition-timing-function: ease-out
}
</style>
