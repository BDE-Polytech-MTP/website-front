<template>
  <aside class="hero is-primary is-bold is-unselectable">
    <div class="hero-body has-text-centered">
      <p class="title is-1">{{ time }}</p>
      <p class="subtitle" v-if="location">{{ location }}</p>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    time: { type: String, required: true },
    location: { type: String, required: false },
  },
};
</script>