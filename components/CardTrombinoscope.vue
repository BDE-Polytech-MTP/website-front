<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title is-centered">
        {{ poste }}
      </p>
    </header>
    <div class="card-image">
      <div class="card-desc">
        <p class="has-text-centered">
          <strong class="has-text-white">{{ name }}</strong>
          <template v-if="description"> <br />{{ description }} </template>
          <template v-if="url">
            <br />
            <a :href="url">Lien: Facebook</a>
          </template>
        </p>
      </div>
      <figure class="image is-2by3">
        <img
          v-if="picture"
          :src="require(`~/assets/img/${picture}`)"
          :alt="`${picture}`"
        />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poste: { type: String, required: false, default: 'Job not found' },
    picture: { type: String, required: false, default: 'logo380.png' },
    url: { type: String, required: false },
    name: { type: String, required: true, default: 'Name not found' },
    description: { type: String, required: false },
  },
};
</script>

<style scoped>
.card-desc {
  width: 100%;
}
.card-image:hover > .card-desc {
  visibility: visible;
  background: rgba(160, 160, 160, 0.9);
  transition-duration: 0.6s;
}
.card-image:hover > .card-desc p {
  transform: translateY(0%);
  transition-duration: 0.6s;
}
a {
  text-decoration: underline;
}
.card-image .card-desc p {
  transform: translateY(20%);
  margin: auto;
}
div .card-image div {
  position: absolute;
  visibility: hidden;
  display: flex;
  font-size: x-large;
  z-index: 1;
}
.card {
  box-shadow: 0 0 25px grey;
}
</style>
