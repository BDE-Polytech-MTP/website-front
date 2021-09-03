<template>
  <section class="container">
    <article class="section is-medium ">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">{{title}}</h1>

      <div class="columns is-multiline is-centered ">
        <div class="column is-one-quarter " v-for="member in members" v-bind:key="member.name">
          <CardTrombinoscope
            :name="member.name"
            :picture="member.picture"
            :poste="member.poste"
            :url="member.url"
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
    members:{type:Array ,required:true }
  }

};
</script>

<style scoped>


</style>
