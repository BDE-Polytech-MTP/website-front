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
    website.bureaux.forEach((bureau) => {
      if (bureau.id == params.id) {
        res = true;
      }
    });
    return res;
  },
  data() {
    return {
      components: null,
    };
  },
  beforeMount() {
    this.components = website.bureaux.filter((bureau) => {
      return bureau.id == this.$route.params.id;
    })[0].body;
  },
};
</script>