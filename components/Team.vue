<!-- Introduction of a team -->
<template>
  <div class="column has-text-centered">

    <h1
      class = "title">
      {{ title }}
    </h1>

    <div v-if="descr">
      <p class="subtitle">
        {{ descr }}
      </p>
    </div>

    <hr>
  </div>
</template>

<script>
export default {
  name: "Team",
  props: {
    title: { type: String, required: true },
    descr: {type: String, required: false}
  },
};
</script>

<style scoped>

</style>
