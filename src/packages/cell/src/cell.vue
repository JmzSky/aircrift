<template>
  <a class="ui-cell" :href="href">
    <span class="ui-cell-mask" v-if="isLink"></span>
    <div class="ui-cell-left">
      <slot name="left"></slot>
    </div>
    <div class="ui-cell-wrapper">
      <div class="ui-cell-title">
        <slot name="icon">
          <i v-if="icon" class="uiui" :class="'uiui-' + icon"></i>
        </slot>
        <slot name="title">
          <span class="ui-cell-text" v-text="title"></span>
          <span v-if="label" class="ui-cell-label" v-text="label"></span>
        </slot>
      </div>
      <div class="ui-cell-value" :class="{ 'is-link' : isLink }">
        <slot>
          <span v-text="value"></span>
        </slot>
      </div>
      <i v-if="isLink" class="ui-cell-allow-right"></i>
    </div>
    <div class="ui-cell-right">
      <slot name="right"></slot>
    </div>
  </a>
</template>

<script>

/**
 * UiCell
 * @module components/cell
 * @desc 单元格
 * @param {string|Object} [to] - 跳转链接，使用 vue-router 的情况下 to 会传递给 router.push，否则作为 a 标签的 href 属性处理
 * @param {string} [icon] - 图标，提供 more, back，或者自定义的图标（传入不带前缀的图标类名，最后拼接成 .uiui-xxx）
 * @param {string} [title] - 标题
 * @param {string} [label] - 备注信息
 * @param {boolean} [is-link=false] - 可点击的链接
 * @param {string} [value] - 右侧显示文字
 * @param {slot} - 同 value, 会覆盖 value 属性
 * @param {slot} [title] - 同 title, 会覆盖 title 属性
 * @param {slot} [icon] - 同 icon, 会覆盖 icon 属性，例如可以传入图片
 *
 * @example
 * <UiCell title="标题文字" icon="back" is-link value="描述文字"></UiCell>
 * <UiCell title="标题文字" icon="back">
 *   <div slot="value">描述文字啊哈</div>
 * </UiCell>
 */
export default {
  name: 'UiCell',

  props: {
    to: [String, Object],
    icon: String,
    title: String,
    label: String,
    isLink: Boolean,
    value: {}
  },

  computed: {
    href() {
      if (this.to && !this.added && this.$router) {
        const resolved = this.$router.match(this.to);
        if (!resolved.matched.length) return this.to;

        this.$nextTick(() => {
          this.added = true;
          this.$el.addEventListener('click', this.handleClick);
        });
        return resolved.fullPath || resolved.path;
      }
      return this.to;
    }
  },

  methods: {
    handleClick($event) {
      $event.preventDefault();
      this.$router.push(this.href);
    }
  }
};
</script>

<style lang="scss">
.ui-cell {
  background-color:#fff;
  box-sizing:border-box;
  color:inherit;
  min-height:48px;
  display:block;
  overflow:hidden;
  position:relative;
  text-decoration:none;
}
.ui-cell img {
  vertical-align:middle;
}
.ui-cell:first-child .ui-cell-wrapper {
  background-origin:border-box;
}
.ui-cell:last-child {
  background-image:-webkit-linear-gradient(bottom, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image:linear-gradient(0deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size:100% 1px;
  background-repeat:no-repeat;
  background-position:bottom;
}
.ui-cell-wrapper {
  background-image:-webkit-linear-gradient(top, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-image:linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  background-size: 120% 1px;
  background-repeat: no-repeat;
  background-position: top left;
  background-origin: content-box;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  font-size: 16px;
  line-height: 1;
  min-height: inherit;
  overflow: hidden;
  padding: 0 10px;
  width: 100%;
}
.ui-cell-mask {}
.ui-cell-mask::after {
  background-color:#000;
  content:" ";
  opacity:0;
  top:0;
  right:0;
  bottom:0;
  left:0;
  position:absolute;
}
.ui-cell-mask:active::after {
  opacity:.1;
}
.ui-cell-text {
  vertical-align: middle;
}
.ui-cell-label {
  color: #888;
  display: block;
  font-size: 12px;
  margin-top: 6px;
}
.ui-cell-title {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.ui-cell-value {
  color: #888;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.ui-cell-value.is-link {
  margin-right:24px;
}
.ui-cell-left {
  position: absolute;
  height: 100%;
  left: 0;
  -webkit-transform: translate3d(-100%, 0, 0);
          transform: translate3d(-100%, 0, 0);
}
.ui-cell-right {
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  -webkit-transform: translate3d(100%, 0, 0);
          transform: translate3d(100%, 0, 0);
}
.ui-cell-allow-right::after {
  border: solid 2px #c8c8cd;
  border-bottom-width: 0;
  border-left-width: 0;
  content: " ";
  top:50%;
  right:20px;
  position: absolute;
  width:5px;
  height:5px;
  -webkit-transform: translateY(-50%) rotate(45deg);
  transform: translateY(-50%) rotate(45deg);
}
.ui-cell-swipe .ui-cell-wrapper {
  position: relative;
}
.ui-cell-swipe .ui-cell-wrapper, .ui-cell-swipe .ui-cell-left, .ui-cell-swipe .ui-cell-right {
  -webkit-transition: -webkit-transform 150ms ease-in-out;
  transition: -webkit-transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out;
  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out;
}
.ui-cell-swipe-buttongroup {
  height: 100%;
}
.ui-cell-swipe-button {
  height: 100%;
  display: inline-block;
  padding: 0 10px;
  line-height: 48px;
}
</style>
