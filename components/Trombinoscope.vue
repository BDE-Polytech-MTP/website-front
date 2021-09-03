<template>
  <section class="container">
    <article class="section is-medium ">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">{{title}}</h1>

      <div class="columns is-multiline is-centered ">
        <div class="column is-one-quarter " v-for="membre in membres" v-bind:key="membre.name">
          <CardTrombinoscope
            :name="membre.name"
            :picture="membre.picture"
            :poste="membre.poste"
            :url="membre.url"
          />
        </div>
      </div>
    </article>
  </section>

</template>

<script>
import CardOrganigramme from "~/components/CardTrombinoscope";
export default {
  name: "Trombinoscope",
  props:{
    title:{type:String,required: false},
    membres:{type:Array ,required:true }
  }

};
</script>

<style scoped>


</style>
