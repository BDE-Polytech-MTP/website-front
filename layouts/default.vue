<template>
  <div>
    <client-only>
      <Navbar />
      <Nuxt id="nuxt-app-container" />
      <Footer />
    </client-only>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
#nuxt-app-container {
  margin-top: 4.5rem;
  min-height: calc(100vh - 4.5rem - 10.5rem);
}
</style>