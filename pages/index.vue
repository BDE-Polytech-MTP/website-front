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
      components: website.main,
    };
  },
};
</script>