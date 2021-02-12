<template>
  <section>
    <figure class="image">
      <img
        :src="require(`~/assets/img/${src}`)"
        id="parallax-image"
        :style="`object-position: 0 ${topPercentage}%;`"
      />
      <h1 id="parallax-title" class="title has-text-white" v-if="title">
        {{ title }}
      </h1>
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
    active: { type: Boolean, require: false, default: true },
    title: { type: String, required: false },
  },
  mounted() {
    const img = document.getElementById("parallax-image");
    window.addEventListener("scroll", () => {
      if (this.active) {
        var val = this.topPercentage + window.scrollY * this.speed;
        img.style.objectPosition = `0 ${val}%`;
      }
    });
  },
};
</script>

<style lang="css">
#parallax-title {
  background-image: linear-gradient(#00a5e2, #00a5e2);
  background-size: 0;
  background-repeat: no-repeat;
  display: inline;
  transition: 0.6s ease;
  font-size: 9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
  transform: translate(-50%, -50%);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-left: 0;
  margin-right: 0;
  word-break: unset;
}

#parallax-title:hover {
  background-size: 100%;
}

#parallax-image {
  max-height: 50vh;
  object-fit: cover;
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  #parallax-image {
    max-height: 47vh;
  }
  #parallax-title {
    font-size: 7.5em;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  #parallax-image {
    max-height: 45vh;
  }
  #parallax-title {
    font-size: 6rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  #parallax-image {
    max-height: 45vh;
  }
  #parallax-title {
    font-size: 4.5rem;
  }
}

@media screen and (max-width: 768px) {
  #parallax-image {
    max-height: 40vh;
  }
  #parallax-title {
    font-size: 3rem;
  }
}
</style>