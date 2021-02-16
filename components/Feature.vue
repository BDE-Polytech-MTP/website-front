<template>
  <div class="card feature-card">
    <div class="card-content has-text-centered">
      <div class="media is-flex is-justify-content-center">
        <p class="feature-emoji">{{ emoji }}</p>
      </div>

      <div class="content">
        <p class="title is-4">{{ title }}</p>
        <p class="subtitle is-6">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    emoji: { type: String, required: true },
  },
};
</script>

<style lang="css" scoped>
.feature-card {
  padding: 0.5rem;
  max-width: 15rem;
  min-width: 10rem;
  border-radius: 0.5rem;
  margin: 1rem;
}

.feature-emoji {
  font-size: 3rem;
}

.feature-card:hover {
  transform: translateY(-10px);
  transition: transform 0.1s ease-in-out;
  -o-transition: transform 0.1s ease-in-out;
  -moz-transition: transform 0.1s ease-in-out;
  -webkit-transition: transform 0.1s ease-in-out;
}

.feature-card:hover .feature-emoji {
  transform: scale(1.2) rotate(360deg);
}

.feature-emoji {
  transition-property: all;
  transition-duration: 0.5s;
  transition-timing-function: linear;
}

@media screen and (min-width: 769px) {
  .feature-card {
    max-width: 18rem;
  }
}
</style>