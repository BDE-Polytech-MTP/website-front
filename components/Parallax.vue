<template>
  <section>
    <figure class="image">
      <img
        :src="require(`~/assets/img/${src}`)"
        id="hero-image"
        :style="`object-position: 0 ${topPercentage}%;`"
      />
    </figure>
  </section>
</template>

<script>
export default {
  name: "Parallax",
  props: {
    topPercentage: { type: Number, required: false, default: 50 },
    speed: { type: Number, required: false, default: 0.1 },
    src: { type: String, required: true },
  },
  mounted() {
    const img = document.getElementById("hero-image");
    window.addEventListener("scroll", () => {
      var val = this.topPercentage + window.scrollY * this.speed;
      img.style.objectPosition = `0 ${val}%`;
    });
  },
};
</script>

<style lang="css">
#hero-image {
  max-height: 50vh;
  object-fit: cover;
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  #hero-image {
    max-height: 47vh;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  #hero-image {
    max-height: 45vh;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  #hero-image {
    max-height: 45vh;
  }
}

@media screen and (max-width: 768px) {
  #hero-image {
    max-height: 40vh;
  }
}
</style>