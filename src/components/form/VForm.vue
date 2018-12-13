<template>
  <div class="form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "VForm",
  props: {
    model: {
      type: Object
    },
    rules: Object
  },
  computed: {
    validFields() {
      return this.$children.filter(item => item.prop);
    }
  },
  methods: {
    validate(cb) {
      const arr = this.validFields.map(item => item.validate());
      Promise.all(arr)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>
