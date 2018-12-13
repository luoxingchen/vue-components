<template>
  <div class="home">
    <v-crop-image v-model="url" ref="crop">
      上传
    </v-crop-image>
    <button @click="crop">裁剪图片</button>
    <img :src="src" alt="" style="width: 100px">
    <div class="form">
      <v-form :model="model" :rules="rules" ref="form">
        <v-form-item prop="name">
          <v-input v-model="model.name" placeholder="输入姓名"></v-input>
        </v-form-item>
        <v-form-item>
          <v-input v-model="model.code" placeholder="验证码" show-code></v-input>
        </v-form-item>
        <v-form-item prop="age">
          <v-input v-model="model.age" placeholder="年龄"></v-input>
        </v-form-item>
        <v-form-item prop="age">
          <v-select v-model="model.age" placeholder="选择年龄">
            <option value="1">1</option>
            <option value="2">2</option>
          </v-select>
        </v-form-item>
        <v-form-item>
          <v-button @click="handleClick">确认</v-button>
        </v-form-item>
      </v-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import VCropImage from "@/components/upload/VCropImage.vue";
export default {
  name: "home",
  components: {
    VCropImage
  },
  data() {
    return {
      url: require("../assets/logo.png"), // 可以设置默认值
      src: "",
      model: {
        name: "",
        age: ""
      },
      rules: {
        name: { required: true, message: "不能为空" },
        age: { required: true, message: "不能为空" },
      }
    };
  },
  methods: {
    crop() {
      this.src = this.$refs.crop.canvasToImage(); // 获取裁剪后的图片路径
    },
    handleClick() {
      console.log("this.$refs.form", this.$refs.form);
      this.$refs.form.validate(valid => {
        if (!valid) return;
      });
    }
  }
};
</script>
