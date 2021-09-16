<template>
  <div>
    <Builder
      :components="components" />

  </div>
</template>

<script>
import website from '~/static/integration.json';
export default {
  data() {
    return {
      components: website.integration,

    };
  },

};
</script>

<style scoped>

</style>
