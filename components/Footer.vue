<template>
  <footer class="footer">
    <div class="is-flex" id="footer-container">
      <div>
        <p>
          <strong>Fait avec ❤️</strong>
        </p>
        <ul class="is-list-style">
          <li><small>Axel Duval</small></li>
          <li><small>Florent Hugouvieux</small></li>
        </ul>
      </div>

      <ul>
        <li class="tags has-addons pb-1 mb-1">
          <b-icon icon="bulma" style="color: hsl(171, 100%, 41%)" class="tag" />
          <span
            style="background-color: hsl(171, 100%, 41%)"
            class="tag has-text-white"
          >
            Bulma
          </span>
        </li>
        <li class="tags has-addons">
          <b-icon icon="vuejs" class="tag has-text-success" />
          <span class="tag is-success">Vue.js</span>
        </li>
      </ul>
      <div>
        <p class="has-text-centered"><strong>Bureaux associatifs</strong></p>
        <p class="is-family-code has-text-centered">BDE | BDS | BDA</p>
        <p class="is-family-code has-text-centered">© 2021-2022</p>
      </div>
      <div class="buttons">
        <b-button
          icon-left="facebook"
          class="has-text-info"
          v-if="social.facebook"
          @click="socialNetworkRedirect(social.facebook)"
        />
        <b-button
          icon-left="instagram"
          class="has-text-danger"
          v-if="social.instagram"
          @click="socialNetworkRedirect(social.instagram)"
        />
        <b-button
          icon-left="github"
          v-if="social.github"
          @click="socialNetworkRedirect(social.github)"
        />
        <b-button
          icon-left="snapchat"
          class="has-text-warning"
          v-if="social.snapchat"
          @click="socialNetworkRedirect(social.snapchat)"
        />
      </div>
    </div>
  </footer>
</template>

<script>
import social from "~/static/social-networks.json";
export default {
  name: "Footer",
  data() {
    return {
      social: social,
    };
  },
  methods: {
    socialNetworkRedirect(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style lang="css" scoped>
.is-list-style {
  list-style: square inside;
}
.footer {
  padding-bottom: 3rem;
}
#footer-container {
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
@media screen and (max-width: 768px) {
  #footer-container {
    flex-direction: column-reverse;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
  }
}
</style>