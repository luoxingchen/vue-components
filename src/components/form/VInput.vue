<template>
  <div class="form-item-input"
       :class="classStyle">
    <input :type="type"
           v-model="val"
           :placeholder="placeholder"
           @blur="blur">
    <div class="form-item-input__code"
         v-if="showCode"
         @click="getCode">
      <!-- <slot name="code"></slot> -->
      {{text}}
    </div>
  </div>
</template>
<script>
export default {
  name: "VInput",
  props: {
    type: {
      type: String,
      default: "text"
    },
    value: [Number, String],
    placeholder: String,
    showCode: Boolean,
    text: {
      type: String,
      default: "获取验证码"
    },
    codeDisabled: Boolean
  },
  computed: {
    val: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
        this.$emit("change", val);
      }
    },
    classStyle() {
      return [this.codeDisabled && "form-item-input__loading"];
    }
  },
  methods: {
    getCode(e) {
      if (!this.codeDisabled) {
        this.$emit("getCode", e);
      }
    },
    blur(e) {
      this.$emit("blur", e);
      if (this.$parent.prop) {
        // this.$parent.$emit('k.form.blur', this.val);
      }
    }
  }
};
</script>

<style lang="stylus" type="text/stylus">
.form-item-input {
  position: relative;

  input::-webkit-input-placeholder {
      color: #999;
      font-size: 14px;
      vertical-align: middle;
      opacity: 1;
      // line-height 42px
  }
  input, select, .form-item-time__select {
    box-sizing: border-box;
    border: 1px solid #D6D6D6;
    outline: none;
    width: 100%;
    height: 44px;
    padding-left: 12px;
    font-size: 14px;
    -webkit-appearance: none;
    border-radius: 0;
    background-color: #fff;
    vertical-align: top;
    line-height: 1.5em;
    // &::-webkit-input-placeholder {
    //   color: #999;
    //   font-size: 14px;
    //   vertical-align: middle;
    //   opacity: 1;
    // }
    &:focus {
      color: #000;
      border-color: #000;
      outline-offset: 0;
    }
  }


  &__code {
    color: #000;
    font-size: 14px;
    // padding 0 19px
    min-width: 108px;
    text-align: center;
    position: absolute;
    right: 0;
    bottom: 50%;
    transform: translateY(50%);

    &:before {
      content: '';
      position: absolute;
      left: 2px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      height: 18px;
      width: 1px;
      background: #d6d6d6;
    }
  }
}

.form-item-input.form-item-input__loading {
  .form-item-input__code {
    color: #999;
    height: 42px;
    line-height: 42px;
  }
}
</style>
