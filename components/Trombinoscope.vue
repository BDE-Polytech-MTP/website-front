<template>
  <section class="container">
<<<<<<< HEAD
    <article class="section is-medium">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">
        {{ title }}
      </h1>

      <div class="columns is-multiline is-centered">
        <div
          class="column is-one-quarter"
          v-for="member in members"
          v-bind:key="member.name"
        >
          <CardTrombinoscope
            :name="member.name"
            :picture="member.picture"
            :poste="member.poste"
            :url="member.url"
=======
    <article class="section is-medium ">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">{{title}}</h1>

      <div class="columns is-multiline is-centered ">
        <div class="column is-one-quarter " v-for="membre in membres" v-bind:key="membre.name">
          <CardTrombinoscope
            :name="membre.name"
            :picture="membre.picture"
            :poste="membre.poste"
            :url="membre.url"
>>>>>>> e595ab2 (Ajout des composants pour créer un trombinoscope)
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  name: 'Trombinoscope',
  props: {
    title: { type: String, required: false },
    members: { type: Array, required: true },
  },

};
</script>

<style scoped>
</style>
