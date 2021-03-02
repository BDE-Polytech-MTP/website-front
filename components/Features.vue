<template>
  <section class="container is-unselectable">
    <article class="section is-medium">
      <div class="mb-6 column is-8 is-offset-2" v-if="title && subtitle">
        <h1 class="title is-1 has-text-centered mb-6">{{ title }}</h1>
        <p class="subtitle has-text-centered">
          {{ subtitle }}
        </p>
      </div>
      <ul
        class="is-flex is-align-items-center is-flex-wrap-wrap is-justify-content-space-around"
      >
        <li v-for="element in features" v-bind:key="element.title">
          <Feature
            :emoji="element.emoji"
            :title="element.title"
            :subtitle="element.subtitle"
          />
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    features: { type: Array, required: true },
    title: { type: String, required: false },
    subtitle: { type: String, required: false },
  },
};
</script>

<style lang="css">
</style>