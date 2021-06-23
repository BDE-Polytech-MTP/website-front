<template>
  <BuilderTeam
  :components="components"
  />
</template>

<script>
import website from '~/static/website.json';
export default {
  data() {
    return {
      components: website.equipe,
    };
  },
};
</script>

<style scoped>

</style>
