<template>
  <div class="form-item-input form-item-radio">
    <span class="form-item-radio__box" :class="{active: model === selectValue}" @click="change"></span>
    <div class="form-item-radio__tips">
      <slot>
        
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  model: {
    prop: "checked"
  },
  name: "VRadio",
  props: {
    selectValue: {
      type: [String, Boolean],
      default: true
    },
    checked: {
      type: [String, Boolean],
      default: true
    }
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  },
  methods: {
    change() {
      this.model = this.model === this.selectValue ? "" : this.selectValue;
      if (this.$parent.prop) {
        this.$parent.$emit("k.form.blur", this.model);
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.form-item-radio
  display flex
  &__box 
    position relative
    display inline-block
    width 20px
    height 20px
    border 1px solid #D6D6D6
    &.active:after
      content ''
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      width 10px
      height 10px
      background #000
  &__tips
    flex 1
    font-size 12px
    line-height 18px
    color #919191
    margin-left 12px
    text-align justify
    // display: flex;
    // align-items: center;
    a 
      color #919191
</style>
