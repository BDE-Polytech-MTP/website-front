<template>
  <div
    class="section is-unselectable"
    style="padding-left: 0; padding-right: 0"
  >
    <section :class="'hero is-medium is-bold ' + theme">
      <div class="hero-body level">
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
    </section>
  </div>
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