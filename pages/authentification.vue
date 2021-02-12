<template>
  <div
    id="authentication-container"
    class="is-flex is-flex-direction-column is-align-items-center is-justify-content-center"
  >
    <div
      class="column is-full is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd"
    >
      <div class="card">
        <div class="card-content">
          <p class="title is-1 has-text-centered">Connexion</p>
          <Login @onLogin="handleLogin" class="pt-4 pb-3" />
          <NuxtLink to="/">
            <b-button icon-left="home-outline"> </b-button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "auth-layout",
  data() {
    return {};
  },
  methods: {
    handleLogin() {
      console.log("handled");
    },
    handleSignup() {
      console.log("handled");
    },
  },
};
</script>

<style lang="css" scoped>
#authentication-container {
  min-height: 100vh;
}
</style>