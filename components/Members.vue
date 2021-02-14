<template>
  <section class="container">
    <article class="section is-medium">
      <div class="columns is-align-items-center">
        <div class="column p-5" v-if="map">
          <iframe
            :src="map"
            frameborder="0"
            style="border: 0; width: 100%; height: 100%"
            allowfullscreen
            aria-hidden="false"
            tabindex="0"
          />
        </div>
        <div class="column p-5">
          <p class="subtitle is-size-5 is-family-monospace has-text-primary">
            {{ subtitle }}
          </p>
          <h1 class="title is-1">
            {{ title }}
          </h1>
          <hr />
          <ul class="members">
            <li
              v-for="(member, index) in members"
              v-bind:key="`members-${index}`"
            >
              {{ member }}
            </li>
          </ul>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: "Members",
  props: {
    map: { type: String, required: false },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    members: { type: Array, required: true },
  },
};
</script>

<style lang="css">
iframe {
  max-height: 50vh;
  min-height: 40vh;
}

.members {
  column-count: 3;
  min-height: 30vh;
}

.members > li {
  display: inline-block;
  width: 100%;
}

@media screen and (max-width: 1024px) {
  .members {
    column-count: 2;
  }
}

@media screen and (max-width: 768px) {
  .members {
    column-count: 1;
  }
}
</style>