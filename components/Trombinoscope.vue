<template>
  <section class="container">

    <article class="section is-medium trombi">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">{{title}}</h1>

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
            :description="member.description"
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

<<<<<<< HEAD
<style scoped>
</style>

=======
<style>
.trombi {
  margin-top: 0px;
  padding: 0px;
}
</style>
>>>>>>> 36c0db6 (trombi page bde)
