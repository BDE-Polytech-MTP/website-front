<template>
  <section class="mt-2">
    <p class="actu has-text-centered">Actualités</p>
    <b-carousel
      pause-text="Défilement automatique en pause"
      pause-info-type="is-info"
    >
      <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
        <b-image
          class="image"
          :src="
            carousel.picture ? carousel.picture : 'https://picsum.photos/1000'
          "
        />
        <div class="has-text-centered carousel-item-desc py-6">
          <h1 class="title has-text-white">{{ carousel.title }}</h1>
          <p
            class="has-text-white"
            v-for="(line, j) in carousel.content"
            :key="j"
          >
            {{ line }}
          </p>
        </div>
      </b-carousel-item>
    </b-carousel>
  </section>
</template>

<style scoped>
.actu {
  font-size: 60px;
  font-weight: bold;
  padding: 20px;
  font-family: monospace;
}
.carousel-item-desc {
  background-color: rgba(0, 0, 0, 0.4);
  display: absolute;
  bottom: 0px;
}
</style>

<script>
export default {
  props: {
    carousels: { type: Array, required: true },
  },
};
</script>

