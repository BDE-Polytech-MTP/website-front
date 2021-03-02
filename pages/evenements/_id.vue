<template>
  <main class="background-gradient">
    <Builder :components="components" />
  </main>
</template>

<script>
import website from '~/static/website.json';

export default {
  data() {
    return {
      components: null,
    };
  },
  beforeMount() {
    website.evenements.forEach((type) => {
      type.elements.forEach((elt) => {
        if (elt.id == this.$route.params.id) {
          this.components = elt.body;
        }
      });
    });
  },
};
</script>

<style lang="css">
</style>