
<template>
  <div class="upload"
       ref="upload"
       :class="{'upload-border': url}">
    <div class="upload-content"
         ref="content">
      <!-- <img src="../../assets/upload.png"
           class="upload-icon"
           alt=""
           v-if="!url"> -->
      <canvas id="canvas"
              width="163px"
              height="214px"
              ref="canvas"
              v-show="url"></canvas>
    </div>
    <div class="upload-btn">
      <slot />
      <input type="file"
             class="upload-input"
             @change="uploadChange">
    </div>
  </div>
</template>
<script>
/**
 * VCropImage
 * 
 * 用于裁剪压缩图片  支持上传图片
 * 
 */
export default {
  name: "VCropImage",
  props: {
    value: String,
    quality: {
      type: Number,
      default: 0.8
    }
  },
  data() {
    return {
      // url: "",
      // quality: 0.8,
      mime: "",
      canvas: "",
      ctx: "",
      image: "",
      scale: window.devicePixelRatio,
      initPosition: {
        clientX: 0,
        clientY: 0
      },
      movePosition: {
        clientX: 0,
        clientY: 0
      },
      endPosition: {
        x: 0,
        y: 0
      }
    };
  },
  computed: {
    url() {
      return this.value;
    }
  },
  async mounted() {},
  watch: {
    url: {
      immediate: true,
      deep: true,
      handler() {
        this.$nextTick(async () => {
          console.log(this.url);
          this.init(this.url);
        });
      }
    }
  },
  methods: {
    async uploadChange(e) {
      const file = e.target.files[0];
      if (file) {
        const url = await this.fileReader(file);
        this.mime = file.type;
        this.$nextTick(async () => {
          this.init(url);
        });
      }
    },
    fileReader(file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise(resolve => {
        reader.onload = function() {
          resolve(this.result);
        };
      });
    },
    async init(url) {
      this.canvas = this.$refs.canvas;
      this.canvas.width = this.$refs.content.offsetWidth * this.scale;
      this.canvas.height = this.$refs.content.offsetHeight * this.scale;
      this.canvas.addEventListener("touchmove", this.handleMove);
      this.canvas.addEventListener("touchstart", this.handleDown);
      this.canvas.addEventListener("touchend", this.handleOut);
      this.ctx = this.canvas.getContext("2d");
      this.image = await this.loadImage(url);
      this.initCanvas();
      // const blogFile = await this.urlToBlob();
      this.$emit("input", url); // 默认图片无裁剪的
      this.draw(0, 0);
    },
    initCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.initPosition = {
        clientX: 0,
        clientY: 0
      };
      this.movePosition = {
        clientX: 0,
        clientY: 0
      };
      this.endPosition = {
        x: 0,
        y: 0
      };
    },
    canvasToImage() {
      return this.canvas.toDataURL(this.mime, this.quality);
    },
    loadImage(url) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      return new Promise(resolve => {
        img.onload = () => resolve(img);
      });
    },
    draw(x, y) {
      const n = this.image.width / this.image.height;
      if (this.image.width > this.image.height) {
        this.ctx.drawImage(
          this.image,
          x * this.scale,
          y * this.scale,
          this.canvas.height * n,
          this.canvas.height
        );
      } else {
        this.ctx.drawImage(
          this.image,
          x * this.scale,
          y * this.scale,
          this.canvas.width,
          this.canvas.width / n
        );
      }
    },
    translate(offsetX, offsetY) {
      const x = this.endPosition.x + offsetX;
      const y = this.endPosition.y + offsetY;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.draw(x, y);
    },
    handleMove(e) {
      e.preventDefault();
      const { clientX, clientY } = e.changedTouches[0];
      const offsetX = clientX - this.initPosition.clientX;
      const offsetY = clientY - this.initPosition.clientY;
      this.translate(offsetX, offsetY);
    },
    handleDown(e) {
      e.preventDefault();
      const { clientX, clientY } = e.changedTouches[0];
      this.initPosition = { clientX, clientY };
    },
    handleOut(e) {
      e.preventDefault();
      const { clientX, clientY } = e.changedTouches[0];
      const offsetX = clientX - this.initPosition.clientX;
      const offsetY = clientY - this.initPosition.clientY;
      this.endPosition = {
        x: (this.endPosition.x += offsetX),
        y: this.endPosition.y + offsetY
      };
      Object.assign(this.initPosition, {
        clientX: 0,
        clientY: 0
      });
      Object.assign(this.movePosition, {
        clientX: 0,
        clientY: 0
      });
    },
    urlToBlob(url = this.canvasToImage()) {
      var arr = url.split(","),
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "image/jpg" });
    },
    async drawImage() {
      const canvas = document.createElement("canvas");
      const img = await this.loadImage(this.url);
      const n = img.height / img.width;
      canvas.width = img.width * 0.8;
      canvas.height = canvas.width * n;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpg", this.quality);
    }
  }
};
</script>

<style lang="stylus" scoped type="text/stylus">
.upload {
  width: 217px;
  height: 217px;
  position: relative;
  background: #fff;
  overflow-x: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 16px;
  border: 6px #b92227 solid;
  box-shadow: 0px 15px 15px 0px rgba(204, 22, 22, 0.3);

  &-icon {
    width: 138px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
  }

  &-img {
    /* width: 100%; */
    flex: 1;
  }

  &-input {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    outline: none;
    opacity: 0;
    z-index: 10;
  }
}

.upload-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: auto;
  overflow: hidden;
  height: 20px;
  img {
    float: left;
    width: 100%;
  }
}

.upload-content {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1;
  width: 100%;
  overflow: hidden;
}

#canvas {
  width: 100%;
}
</style>
