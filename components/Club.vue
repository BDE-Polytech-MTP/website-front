<template>
  <div class="card feature-card" :style="cardStyle2" >
    <div class="card-header" :style="cardStyle1" >
      <h5 class="card-header-title is-centered ">{{ title }}</h5>
    </div>
    <div class=" card-content" :style="cardStyle2">
          <figure class="image" style="height: 100%">
            <img  :src="image" alt="Placeholder image" >
          </figure>
    </div>
    <div class="card-footer has-text-centered" :style="cardStyle2">
      <p class="is-6-title card-footer-item">Dirigé par : {{ directedBy }}<br>Heure: {{ hour }}<br>Lieu: {{ location }}</p>
    </div>
  </div>
</template>

<script>
import Article from '~/components/Article';
export default {
  components: { Article },
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
  height: 50px;
  position: relative;
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
  height: 200px;
  padding: 0px;
  position: relative;
  overflow: hidden;
}
.card {
  border:1px solid;
  height: 400px;
}

.card-footer {
  height: 150px;
  width: auto;
  padding: 0px;
  position: relative;
}

</style>
