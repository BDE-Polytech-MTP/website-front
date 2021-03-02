<template>
  <section class="background-gradient">
    <Builder :components="components" />
  </section>
</template>

<script>
import website from '~/static/website.json';
export default {
  data() {
    return {
      components: website.adhesions,
    };
  },
};
</script>