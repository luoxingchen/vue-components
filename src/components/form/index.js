import Vue from "vue";
import VButton from "./VButton.vue";
import VForm from "./VForm.vue";
import VFormItem from "./VFormItem.vue";
import VInput from "./VInput.vue";
import VRadio from "./VRadio.vue";
import VSelect from "./VSelect.vue";

[VButton, VForm, VFormItem, VInput, VRadio, VSelect].forEach(component => {
  component.install = Vue => Vue.component(component.name, component);
  Vue.use(component);
});
