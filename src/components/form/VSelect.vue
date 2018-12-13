<template>
  <div class="form-item-input form-item-select">
    <!-- {{placeholder}} -->
    <select
           v-model="val"
           :class="{placeholder: !val}"
           @change="blur">
           <option value="" disabled selected hidden>{{placeholder}}</option>
           <slot></slot>
    </select>
  </div>
</template>
<script>
export default {
  name: "VSelect",
  props: {
    value: [Number, String],
    placeholder: String
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
    }
  },
  methods: {
    blur(e) {
      this.$emit("blur", e);
      if (this.$parent.prop) {
        this.$parent.$emit("k.form.blur", this.val);
      }
    }
  }
};
</script>
<style lang="stylus">
.form-item-select
  position relative
  &:after 
    content ''
    display inline-block
    background: url('../../assets/images/triangle.png') no-repeat;
    background-size: 100% 100%;
    width: 10px;
    height: 6px;
    border: 0;
    position absolute
    top: 50%;
    margin-top: -3px;
    right: 12px;
  .placeholder
    color: #999999;
    font-size: 14px; 
    opacity 1
</style>
