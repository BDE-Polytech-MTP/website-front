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

<style lang="css">
#nuxt-app-error-container {
  max-height: calc(100vh - 10.5rem);
}
</style>