<template>
  <div
    class="is-flex is-justify-content-center is-align-items-center background-gradient-lines"
  >
    <section class="container">
      <article class="section is-medium">
        <div class="columns is-align-items-center">
          <div class="column p-5 is-clipped is-hidden-touch parent">
            <figure class="image">
              <img :src="picture" class="img-br" />
            </figure>
            <figure class="image" id="overlay-dots">
              <img src="~assets/img/dots.svg" />
            </figure>
          </div>
          <div class="column p-5" id="error-message">
            <h1 class="title is-1 pb-5">Oops...</h1>
            <p class="subtitle mb-6">{{ message }}</p>
            <NuxtLink class="subtitle" to="/">
              <b-button icon-left="navigation" type="is-primary" id="test">
                Page principale
              </b-button>
            </NuxtLink>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import errors from "~/static/errors.json";
export default {
  name: "NuxtError",
  layout: "error-layout",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500;
    },
    message() {
      if (errors[this.statusCode] && errors[this.statusCode].description) {
        return errors[this.statusCode].description;
      }
      return errors.default.description;
    },
    picture() {
      if (errors[this.statusCode] && errors[this.statusCode].photo) {
        return errors[this.statusCode].photo;
      }
      return errors.default.photo;
    },
  },
  head() {
    return {
      title: "Oops... | " + this.statusCode,
      meta: [
        {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0",
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
#error-message {
  max-width: 30vw;
}
@media screen and (max-width: 1023px) {
  #error-message {
    text-align: center;
    max-width: 60vw;
    margin-left: auto;
    margin-right: auto;
  }
}
@media screen and (max-width: 769px) {
  #error-message {
    text-align: center;
    max-width: 100vw;
  }
}
#overlay-dots {
  position: absolute;
  bottom: 10%;
  left: 10%;
  height: 15%;
  width: 10%;
  z-index: 3;
}
</style>
