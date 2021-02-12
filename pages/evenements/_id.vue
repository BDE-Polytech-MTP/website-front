<template>
  <div>
    <section class="container" v-if="evenement">
      <h1>{{ evenement }}</h1>
    </section>
  </div>
</template>

<script>
import hydration from "~/static/data.json";

export default {
  data() {
    return {
      evenement: null,
      group: null,
    };
  },
  beforeMount() {
    hydration.evenements.elements.forEach((type) => {
      type.elements.forEach((elt) => {
        if (elt.id == this.$route.params.id) {
          this.evenement = elt;
          this.group = { type: type.type, emoji: type.emoji };
          console.log(this.group);
        }
      });
    });
  },
};
</script>

<style lang="css">
</style>