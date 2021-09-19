<template>
  <section class="container">
    <article class="section is-medium trombi">
      <h1 v-if="title" class="title is-1 has-text-centered mb-6">{{title}}</h1>

      <div class="columns is-multiline is-centered ">
        <div class="column is-one-quarter " v-for="membre in membres" v-bind:key="membre.name">
          <CardTrombinoscope
            :name="membre.name"
            :picture="membre.picture"
            :poste="membre.poste"
            :url="membre.url"
            :description="membre.description"
          />
        </div>
      </div>
    </article>
  </section>

</template>

<script>

export default {
  props:{
    title:{type:String,required: false},
    membres:{type:Array ,required:true }
  }
};
</script>

<style>
.trombi {
  margin-top: 0px;
  padding: 10px;
}
</style>
