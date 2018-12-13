<template>
  <div class="form-item">
    <div class="form-item-fields"
         :class="{'form-item-fields__error': showError || errorValid.showError}">
      <slot></slot>
    </div>
    <transition name="message">
      <div class="form-item__message" v-html="errorValid.errorMessage ||errorMessage"
          v-if="(showError || errorValid.showError) && errorMessage !== 'null'">
        <!-- {{  }} -->
      </div>
    </transition>
  </div>
</template>
<script>
import schema from "async-validator";
import utils from "@/utils";
export default {
  name: "VFormItem",
  props: {
    prop: String,
    errorValid: {
      type: Object,
      default: function() {
        return {
          showError: false,
          errorMessage: ""
        };
      }
    }
  },
  data() {
    return {
      showError: false,
      errorMessage: ""
    };
  },
  watch: {
    model: function(newValue) {
      Object.keys(newValue).forEach(key => {
        if (!Array.isArray(newValue[key]) && newValue[key]) {
          this.validate();
        } else if (Array.isArray(newValue[key]) && newValue[key].length) {
          this.validate();
        }
      });
    }
  },
  computed: {
    rule() {
      let obj = {};
      Object.keys(this.$parent.rules).forEach(key => {
        if (key == this.prop) {
          obj[key] = this.$parent.rules[key];
        }
      });
      return obj;
    },
    model() {
      let obj = {};
      Object.keys(this.$parent.model).forEach(key => {
        if (key == this.prop) {
          obj[key] = this.$parent.model[key];
        }
      });
      return obj;
    }
  },
  mounted() {
    if (!utils.isEmptyObj(this.rule)) {
      this.$on("k.form.blur", this.validate);
    }
  },
  methods: {
    validate() {
      let validator = new schema(this.rule);
      return new Promise((resolve, reject) => {
        validator.validate(this.model, error => {
          if (error) {
            this.showError = true;
            const [err] = error;
            this.errorMessage = err.message;
            reject(err);
          } else {
            this.showError = false;
            resolve(true);
          }
        });
      });
    }
  }
};
</script>
<style lang="stylus">
.form-item {
  padding-bottom: 24px;
}

.form-item__message {
  color: #D00000;
  font-size: 12px;
  padding-top: 12px;
  a {
    color #D00000
  }
}

.message-enter-active, .message-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: all 0.2s;
  transform-origin: center top;
}

.message-enter, .message-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
  transform: scaleY(0);
}

.form-item-fields__error {
  .form-item-input {
    input, select, .form-item-time__select,.form-item-radio__box {
      border-color: #D00000;
    }
  }

  .select-city {
    .vux-cell-box {
      border-color: #D00000;
    }
  }
}
</style>
