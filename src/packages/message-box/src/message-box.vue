<template>
  <div class="ui-msgbox-wrapper cpm" v-show="value">
    <transition name="msgbox-bounce ">
      <div class="ui-msgbox">
        <div class="ui-msgbox-header" v-if="title !== ''">
          <div class="ui-msgbox-title">{{ title }}</div>
        </div>
        <div class="ui-msgbox-content" v-if="message !== ''">
          <div class="ui-msgbox-message" v-html="message"></div>
          <div class="ui-msgbox-input" v-show="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div
              class="ui-msgbox-errormsg"
              :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }"
            >{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="ui-msgbox-btns">
          <button
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            @click="handleAction('cancel')"
          >{{ cancelButtonText }}</button>
          <button
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            @click="handleAction('confirm')"
          >{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/babel">
let CONFIRM_TEXT = "确定";
let CANCEL_TEXT = "取消";

import Popup from "../../src/utils/popup";

export default {
  mixins: [Popup],

  props: {
    modal: {
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      default: true
    },
    closeOnPressEscape: {
      default: true
    },
    inputType: {
      type: String,
      default: "text"
    }
  },

  computed: {
    confirmButtonClasses() {
      let classes =
        "ui-msgbox-btn ui-msgbox-confirm " + this.confirmButtonClass;
      if (this.confirmButtonHighlight) {
        classes += " ui-msgbox-confirm-highlight";
      }
      return classes;
    },
    cancelButtonClasses() {
      let classes = "ui-msgbox-btn ui-msgbox-cancel " + this.cancelButtonClass;
      if (this.cancelButtonHighlight) {
        classes += " ui-msgbox-cancel-highlight";
      }
      return classes;
    }
  },

  methods: {
    doClose() {
      this.value = false;
      this._closing = true;

      this.onClose && this.onClose();

      setTimeout(() => {
        if (this.modal && this.bodyOverflow !== "hidden") {
          document.body.style.overflow = this.bodyOverflow;
          document.body.style.paddingRight = this.bodyPaddingRight;
        }
        this.bodyOverflow = null;
        this.bodyPaddingRight = null;
      }, 200);
      this.opened = false;

      if (!this.transition) {
        this.doAfterClose();
      }
    },

    handleAction(action) {
      if (this.$type === "prompt" && action === "confirm" && !this.validate()) {
        return;
      }
      var callback = this.callback;
      this.value = false;
      callback(action);
    },

    validate() {
      if (this.$type === "prompt") {
        var inputPattern = this.inputPattern;
        if (inputPattern && !inputPattern.test(this.inputValue || "")) {
          this.editorErrorMessage =
            this.inputErrorMessage || "输入的数据不合法!";
          this.$refs.input.classList.add("invalid");
          return false;
        }
        var inputValidator = this.inputValidator;
        if (typeof inputValidator === "function") {
          var validateResult = inputValidator(this.inputValue);
          if (validateResult === false) {
            this.editorErrorMessage =
              this.inputErrorMessage || "输入的数据不合法!";
            this.$refs.input.classList.add("invalid");
            return false;
          }
          if (typeof validateResult === "string") {
            this.editorErrorMessage = validateResult;
            return false;
          }
        }
      }
      this.editorErrorMessage = "";
      this.$refs.input.classList.remove("invalid");
      return true;
    },

    handleInputType(val) {
      if (val === "range" || !this.$refs.input) return;
      this.$refs.input.type = val;
    }
  },

  watch: {
    inputValue() {
      if (this.$type === "prompt") {
        this.validate();
      }
    },

    value(val) {
      this.handleInputType(this.inputType);
      if (val && this.$type === "prompt") {
        setTimeout(() => {
          if (this.$refs.input) {
            this.$refs.input.focus();
          }
        }, 500);
      }
    },

    inputType(val) {
      this.handleInputType(val);
    }
  },

  data() {
    return {
      title: "",
      message: "",
      type: "",
      showInput: false,
      inputValue: null,
      inputPlaceholder: "",
      inputPattern: null,
      inputValidator: null,
      inputErrorMessage: "",
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: "",
      confirmButtonDisabled: false,
      cancelButtonClass: "",
      editorErrorMessage: null,
      callback: null
    };
  }
};
</script>
<style lang="scss">
.ui-msgbox {
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate3d(-50%, -50%, 0);
  transform: translate3d(-50%, -50%, 0);
  background-color: #fff;
  width: 85%;
  border-radius: 3px;
  font-size: 16px;
  -webkit-user-select: none;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: 0.2s;
  transition: 0.2s;
}
.ui-msgbox-header {
  padding: 15px 0 0;
}
.ui-msgbox-content {
  padding: 10px 20px 15px;
  border-bottom: 1px solid #ddd;
  min-height: 36px;
  position: relative;
}
.ui-msgbox-input {
  padding-top: 15px;
}
.ui-msgbox-input input {
  border: 1px solid #dedede;
  border-radius: 5px;
  padding: 4px 5px;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  outline: none;
}
.ui-msgbox-input input.invalid {
  border-color: #ff4949;
}
.ui-msgbox-input input.invalid:focus {
  border-color: #ff4949;
}
.ui-msgbox-errormsg {
  color: red;
  font-size: 12px;
  min-height: 18px;
  margin-top: 2px;
}
.ui-msgbox-title {
  text-align: center;
  padding-left: 0;
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.ui-msgbox-message {
  color: #999;
  margin: 0;
  text-align: center;
  line-height: 25px;
}
.ui-msgbox-btns {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 40px;
  line-height: 40px;
}
.ui-msgbox-btn {
  line-height: 35px;
  display: block;
  background-color: #fff;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  margin: 0;
  border: 0;
}
.ui-msgbox-btn:focus {
  outline: none;
}
.ui-msgbox-btn:active {
  background-color: #fff;
}
.ui-msgbox-cancel {
  width: 50%;
  border-right: 1px solid #ddd;
}
.ui-msgbox-cancel:active {
  color: #000;
}
.ui-msgbox-confirm {
  color: $color;
  width: 50%;
}
.ui-msgbox-confirm:active {
  color: $color;
}
.msgbox-bounce-enter {
  opacity: 0;
  -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
.msgbox-bounce-enter {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.7);
}
.msgbox-bounce-leave-active {
  opacity: 0;
  transform: translate3d(-50%, -50%, 0) scale(0.9);
}
</style>