<template>
  <div>
    <img :src="url"
         class="result-img"
         alt="">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
/**
 * canvasToImage
 *
 * 将html 转换成图片  只支持文字和图片
 * texts 所有文本的节点 暂不支持换行
 * images 所有文图片的节点
 */
export default {
  name: "canvasToImage",
  props: ["texts", "images"],
  data() {
    return {
      canvas: null,
      ctx: null,
      scale: window.devicePixelRatio,
      url: ""
    };
  },
  computed: {
    content() {
      return this.$parent.$refs.content; // 容器
    }
  },
  mounted() {
    this.$nextTick(async () => {
      this.canvas = document.getElementById("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = this.content.offsetWidth * this.scale;
      this.canvas.height = this.content.offsetHeight * this.scale;
      //canvas 背景色
      this.ctx.beginPath();
      this.ctx.fillStyle = "#fff";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  },
  watch: {
    texts: {
      deep: true,
      handler() {
        this.draw();
      }
    },
    images: {
      deep: true,
      handler() {
        this.draw();
      }
    }
  },
  methods: {
    offset(target) {
      let top = 0,
        left = 0;
      while (target.offsetParent) {
        top += target.offsetTop;
        left += target.offsetLeft;
        target = target.offsetParent;
      }
      return {
        top: top,
        left: left
      };
    },
    async draw() {
      const images = await Promise.all(
        this.images.map(image => this.loadImage(image.getAttribute("src")))
      );
      images.forEach((image, index) => {
        const img = this.images[index];
        this.drawImage(
          image,
          this.offset(img).offsetLeft,
          this.offset(img).offsetTop,
          img.offsetWidth,
          img.offsetHeight
        );
      });
      this.texts.forEach(target => this.drawText(target));
      this.url = this.canvas.toDataURL("image/jpeg");
    },
    loadImage(url) {
      const img = new Image();
      img.src = url;
      return new Promise(resolve => {
        img.onload = () => resolve(img);
      });
    },
    drawImage(img, x, y, width, height) {
      this.ctx.drawImage(
        img,
        x * this.scale,
        y * this.scale,
        width * this.scale,
        height * this.scale
      );
    },
    drawText(target) {
      const text = target.innerHTML;
      const {
        fontSize,
        color,
        fontFamily,
        lineHeight
      } = window.getComputedStyle(target);
      this.ctx.font = `${this.px2int(fontSize) * this.scale}px/${this.px2int(
        lineHeight
      ) * this.scale} ${fontFamily}`;
      this.ctx.fillStyle = color;
      this.ctx.textAlign = "center";
      this.ctx.textBaseline = "hanging";
      this.ctx.fillText(
        text,
        this.canvas.width / 2,
        target.offsetTop * this.scale
      );
    },
    px2int(str) {
      if (str) return parseInt(str.replace("px", ""));
      return str;
    }
  }
};
</script>

<style scoped>
#dialog-canvas,
.result-img {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  opacity: 1;
}

#dialog-canvas {
  display: none;
}
</style>
