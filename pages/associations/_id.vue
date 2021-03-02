<template>
  <main class="background-gradient">
    <Builder :components="components" />
  </main>
</template>

<script>
import website from '~/static/website.json';
export default {
  validate({ params }) {
    let res = false;
    website.associations.forEach((type) => {
      type.elements.forEach((elt) => {
        if (elt.nom.toLowerCase().replace(' ', '-') == params.id) {
          res = true;
        }
      });
    });
    return res;
  },
  data() {
    return {
      components: null,
    };
  },
  beforeMount() {
    website.associations.forEach((type) => {
      type.elements.forEach((elt) => {
        if (elt.nom.toLowerCase().replace(' ', '-') == this.$route.params.id) {
          this.components = elt.body;
        }
      });
    });
  },
};
</script>
