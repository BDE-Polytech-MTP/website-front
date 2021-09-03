<template>
  <section class="container">
    <article class="section is-medium">
      <p class="title has-text-centered" :style="headerColor">Découvrez nos clubs</p>
      <br>
      <div class="columns is-multiline">
        <div class="column is-one-third" v-for="club in computedClubs" v-bind:key="club.title">
          <Club
            :title="club.title"
            :image="club.image"
            :directedBy="club.directedBy"
            :hour="club.hour"
            :location="club.location"
            :color="club.color"
          />
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    clubs: { type: Array, required: true },
    color: { type: String, default: "rgb(0,156,221)"}
  },
  computed: {
    computedClubs(){
      return this.clubs.map((e) => {
        e.color = e.color ? e.color : this.color
        return e
      })
    },
    headerColor() {
      return {
        "background-color":this.color }
    }
  }
};
</script>

<style lang="css" scoped>

.section {
  padding-top:0px;
  padding-bottom: 0px;
}

p {
  color:white;
  border-radius: 4px;
}
</style>
