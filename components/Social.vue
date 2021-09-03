<template>
  <section class="container">
    <p class="follow">SUIVEZ-NOUS</p>
    <div class="buttons is-centered">
      <b-button
        icon-left="facebook"
        class="has-text-info"
        v-if="facebook"
        @click="socialNetworkRedirect(facebook)"
      />
      <b-button
        icon-left="instagram"
        class="has-text-danger"
        v-if="instagram"
        @click="socialNetworkRedirect(instagram)"
      />
      <b-button
        icon-left="snapchat"
        class="has-text-warning"
        v-if="snapchat"
        @click="socialNetworkRedirect(snapchat)"
      />
      <b-button
        icon-left="tiktok"
        v-if="tiktok"
        @click="socialNetworkRedirect(tiktok)"
      />
    </div>
  </section>
</template>

<script>

export default {
  props: {
    facebook: { Type: String, required: false },
    instagram: { Type: String, required: false },
    snapchat: { Type: String, required: false },
    tiktok: { Type: String, required: false },
  },
  methods: {
    socialNetworkRedirect(url) {
      window.open(url, "_blank");
    },
  },
}

</script>

<style>

.follow {
  text-align: center;
  font-family: "Georgia Pro";
  font-size: 30px;
  font-weight: bold;
}

</style>
