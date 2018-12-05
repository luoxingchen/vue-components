<template>
  <div class="home">
    <v-crop-image v-model="url" ref="crop">
      上传
    </v-crop-image>
    <button @click="crop">裁剪图片</button>
    <img :src="src" alt="" style="width: 100px">
    <img :src="url" v-if="src" alt="">
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
      src: ""
    };
  },
  methods: {
    crop() {
      this.src = this.$refs.crop.canvasToImage(); // 获取裁剪后的图片路径
    }
  }
};
</script>
