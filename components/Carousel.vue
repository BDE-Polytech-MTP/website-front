<template>

  <section class="container">
    <p class="actu has-text-centered">Actualités</p>
  <b-carousel
        pause-text="Défilement automatique en pause"
        pause-info-type="is-info"
        >
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section class="hero is-large bg-img" v-bind:style="{'background-image': `url('${carousel.picture}')`}">
                <div class="hero-body has-text-centered" style="background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) )">
                    <h1 class="title has-text-white">{{carousel.title}}</h1>
                    <p class="has-text-white" v-for="(line, j) in carousel.content" :key="j" >{{ line }}</p>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
  </section>

</template>

<style scoped>
    .bg-img {
        background-position: center center;
        background-repeat:  no-repeat;
        background-size:  cover;
    }
    .actu {
       font-size: 60px;
       font-weight: bold;
       padding: 20px;
      font-family: monospace;
     }
    .container {
      margin-top:10px;
    }

</style>

<script>
export default {
    props: {
        carousels: { type: Array, required: true }
    }
}
</script>

