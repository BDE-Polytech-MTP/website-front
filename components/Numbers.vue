<template>
  <section :class="'hero is-medium is-bold ' + theme">
    <div class="background-gradient-dotted">
      <div class="hero-body level background-linear-numbers">
        <div
          class="level-item has-text-centered"
          v-for="(elt, index) in content"
          v-bind:key="`numbers-${index}`"
        >
          <div>
            <p class="title">{{ elt.valeur }}</p>
            <p class="heading">{{ elt.titre }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Numbers",
  props: {
    content: { type: Array, required: true },
    theme: { type: String, required: false, default: "is-primary" },
  },
};
</script>

<style lang="css" scoped>
.background-linear-numbers {
  background-image: linear-gradient(
      6deg,
      rgba(0, 0, 0, 0.02) 0%,
      rgba(0, 0, 0, 0.02) 39%,
      transparent 39%,
      transparent 74%,
      rgba(117, 117, 117, 0.02) 74%,
      rgba(117, 117, 117, 0.02) 100%
    ),
    linear-gradient(
      129deg,
      rgba(222, 222, 222, 0.02) 0%,
      rgba(222, 222, 222, 0.02) 65%,
      transparent 65%,
      transparent 73%,
      rgba(83, 83, 83, 0.02) 73%,
      rgba(83, 83, 83, 0.02) 100%
    );
}
</style>