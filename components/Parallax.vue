<template>
  <section class="is-relative">
    <figure class="image">
      <img
        :src="require(`~/assets/img/${src}`)"
        :id="'parallax-image-' + getSize"
        :style="`object-position: 0 ${topPercentage}%;`"
      />
      <h1
        id="parallax-title"
        class="title has-text-white is-unselectable"
        v-if="title"
      >
        {{ title }}
      </h1>
    </figure>
    <div v-if="scrollTo" class="parallax-scroller">
      <Scroller :scrollTo="scrollTo" class="scroller-white" />
    </div>
    <slot></slot>
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
    scrollTo: { type: String, required: false },
    size: { type: String, required: false, default: null }, // [small|medium|fullscreen]
  },
  computed: {
    getSize() {
      if (this.size && (this.size == "medium" || this.size == "fullscreen")) {
        return this.size;
      } else {
        return "small";
      }
    },
  },
  mounted() {
    const img = document.getElementById("parallax-image-" + this.getSize);
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
.parallax-scroller {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -30%);
}
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

#parallax-image-small {
  max-height: 50vh;
  object-fit: cover;
}
#parallax-image-medium {
  max-height: 70vh;
  object-fit: cover;
}
#parallax-image-fullscreen {
  max-height: calc(100vh - 4.5rem);
  object-fit: cover;
}
@media screen and (min-width: 1216px) and (max-width: 1407px) {
  #parallax-image-small {
    max-height: 47vh;
  }
  #parallax-title {
    font-size: 7.5em;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  #parallax-image-small {
    max-height: 45vh;
  }
  #parallax-title {
    font-size: 6rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  #parallax-image-small {
    max-height: 45vh;
  }
  #parallax-title {
    font-size: 4.5rem;
  }
}

@media screen and (max-width: 768px) {
  #parallax-image-small {
    max-height: 40vh;
  }
  #parallax-title {
    font-size: 3rem;
  }
}
</style>