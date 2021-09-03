<template>
  <section class="container">
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

.buttons {
  margin-left: auto;
  margin-right: auto;
  margin-top:20px;
}

p {
  text-align: center;
}

</style>
