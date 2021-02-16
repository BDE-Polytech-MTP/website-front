<template>
  <section class="container">
    <article class="section is-medium">
      <div class="columns is-align-items-center">
        <div class="column p-5 is-clipped parent" v-if="startWithImage">
          <figure class="image grayscale">
            <img :src="require(`~/assets/img/${picture}`)" class="img-br" />
          </figure>
          <figure class="image" id="dots">
            <img src="~assets/img/background-dots-1.png" />
          </figure>
          <figure class="image" id="lines">
            <img src="~assets/img/background-lines-1.png" />
          </figure>
          <figure class="image" id="overlay-dots">
            <img src="~assets/img/dots.svg" />
          </figure>
        </div>
        <div class="column p-5" v-else>
          <p class="subtitle has-text-info is-size-5 is-family-monospace">
            {{ subtitle }}
          </p>
          <h1 class="title is-1">
            {{ title }}
          </h1>
          <div
            v-for="(content, index) in contents"
            v-bind:key="`contents-${index}`"
          >
            <p class="text has-text-justified">
              {{ content }}
            </p>
            <br />
          </div>
          <slot></slot>
        </div>
        <div class="column p-5 is-clipped parent" v-if="!startWithImage">
          <figure class="image grayscale">
            <img :src="require(`~/assets/img/${picture}`)" class="img-br" />
          </figure>
          <figure class="image" id="dots">
            <img src="~assets/img/background-dots-1.png" />
          </figure>
          <figure class="image" id="lines">
            <img src="~assets/img/background-lines-1.png" />
          </figure>
        </div>
        <div class="column p-5" v-else>
          <p class="subtitle has-text-info is-size-5 is-family-monospace">
            {{ subtitle }}
          </p>
          <h1 class="title is-1">
            {{ title }}
          </h1>
          <div
            v-for="(content, index) in contents"
            v-bind:key="`contents-${index}`"
          >
            <p class="text has-text-justified">
              {{ content }}
            </p>
            <br />
          </div>
          <slot></slot>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Article",
  props: {
    startWithImage: { type: Boolean, required: false, default: false },
    picture: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    contents: { type: Array, required: false },
  },
};
</script>

<style lang="css" scoped>
#overlay-dots {
  position: absolute;
  bottom: 10%;
  left: 10%;
  height: 15%;
  width: 10%;
  z-index: 3;
}

#overlay-dots:hover {
  transform: scale(1.4);
}
</style>