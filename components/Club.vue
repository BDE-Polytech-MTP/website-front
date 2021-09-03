<template>
  <div class="card feature-card" :style="cardStyle2" >
    <div class="card-header" :style="cardStyle1" >
      <h5 class="card-header-title is-centered ">{{ title }}</h5>
    </div>
    <div class="card-content" :style="cardStyle2">
      <div class="media">
        <div class="media-left">
          <figure class="image is-128x128">
            <img :src="image" alt="Placeholder image">
          </figure>
        </div>
        <div class="media-content has-text-centered">
          <p class="subtitle is-4">Respo(s) :</p>
          <p class="title is-6 five-lines-max">{{ directedBy }}</p>
        </div>
      </div>
    </div>
    <div class="card-footer has-text-centered" :style="cardStyle2">
      <p class="card-footer-item"> Heure: {{ hour }}<br>Lieu: {{ location }}</p>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, required: true },
    title: { type: String, required: true },
    directedBy: { type: String, required: true },
    hour: { type: String, required: false },
    location: { type: String, required: false },
    color: {type: String, default: "rgb(0,156,221)" }
  },
  computed: {
    cardStyle1() {
      return {
        "background-color": this.color
      };
    },
    cardStyle2() {
      return {
        "border-color": this.color
      };
    }
  }
};
</script>

<style lang="css" scoped>

.card-header {
  background-color: rgb(0,156,221);
}
.feature-card:hover {
  transform: translateY(-10px);
  transition: transform 0.1s ease-in-out;
  -o-transition: transform 0.1s ease-in-out;
  -moz-transition: transform 0.1s ease-in-out;
  -webkit-transition: transform 0.1s ease-in-out;
  box-shadow: 0 0 40px grey;
}
h5 {
  color:white;
}

.card-content {
  border-bottom:1px solid;
}
.card {
  border:1px solid;

}
.five-lines-max {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
}


</style>
