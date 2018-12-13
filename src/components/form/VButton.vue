<template>
  <div>
    <transition name="fade">
      <button class="btn"
              :class="btnClass"
              :disabled="disabled"
              @click="handleClick">
        <slot></slot>
      </button>
    </transition>
    <div class="loading-mask"
         v-if="loading"></div>
  </div>
</template>
<script>
export default {
  name: "VButton",
  props: {
    type: {
      type: String,
      default: "default"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fixed: Boolean,
    loading: Boolean
  },
  computed: {
    btnClass() {
      return [
        this.disabled && "btn-disabled",
        `btn-${this.type}`,
        this.fixed && "btn-fixed",
        this.loading && "btn-loading"
      ];
    }
  },
  methods: {
    handleClick(e) {
      this.$emit("click", e);
    }
  }
};
</script>
<style lang="stylus" type="text/stylus" scoped>
.btn {
  width: 100%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  font-size: 14px;
  outline: none;
  border: none;
}

.btn.btn-fixed {
  position: fixed;
  bottom: 0;
  left: 0;
}

.btn.btn-plain
  border 1px solid #000;
  color #000
  background #fff

.btn.btn-default {
  background: #000;
  color: #fff;

  &.btn-disabled {
    background: #D6D6D6;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.2s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  transform: translateY(50px);
  // transform: scaleY(0);
}

.loading-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
</style>
