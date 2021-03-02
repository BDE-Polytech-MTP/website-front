<template>
  <div>
    <client-only>
      <Nuxt id="nuxt-app-error-container" />
      <Footer />
    </client-only>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
#nuxt-app-error-container {
  margin-top: 4.5rem;
  max-height: calc(100vh - 10.5rem);
}
</style>