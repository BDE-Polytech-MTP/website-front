<template>
  <div class="scroll-container">
    <div class="scroll-down" @click="scroll()"></div>
  </div>
</template>

<script>
export default {
  props: {
    scrollTo: { type: String, required: true },
  },
  methods: {
    scroll() {
      const element = document.getElementById(this.scrollTo);
      element && element.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style lang="css">
.scroll-container {
  position: relative;
  height: 60px;
}
.scroll-down {
  height: 50px;
  width: 30px;
  border-radius: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.scroll-down::before,
.scroll-down::after {
  content: "";
  position: absolute;
  top: 20%;
  left: 50%;
  height: 30px;
  width: 30px;
  transform: translate(-50%, -100%) rotate(45deg);
  border: solid 2px #00a5e2;
  border-top: transparent;
  border-left: transparent;
  animation: scroll-down 1s ease-in-out infinite;
}
.scroll-down::after {
  top: 30%;
  animation-delay: 0.3s;
}

@keyframes scroll-down {
  0% {
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    top: 90%;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .scroll-down::before,
  .scroll-down::after {
    height: 20px;
    width: 20px;
  }
}

@media screen and (max-width: 768px) {
  .scroll-down::before,
  .scroll-down::after {
    height: 10px;
    width: 10px;
  }
}

.scroller-white.scroll-container .scroll-down::before,
.scroller-white.scroll-container .scroll-down::after {
  border: solid 2px white;
  border-top: transparent;
  border-left: transparent;
}
</style>