<template>
    <b-carousel
        pause-text="Défilement automatique en pause"
        pause-info-type="is-info"
        >
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
            <section class="hero is-large bg-img" v-bind:style="{'background-image': `url('${carousel.picture ? carousel.picture : 'https://picsum.photos/1000'}')`}">
                <div class="hero-body has-text-centered" style="background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) )">
                    <h1 class="title has-text-white">{{carousel.title}}</h1>
                    <p class="has-text-white">{{ carousel.content }}</p>
                </div>
            </section>
        </b-carousel-item>
    </b-carousel>
</template>

<style scoped>
    .bg-img {
        background-position: center center;
        background-repeat:  no-repeat;
        background-size:  cover;
    }
</style>

<script>
export default {
    data(){
        return {
            carousels: [
                {
                    title: 'Slide 1',
                    content: 'Coucou',
                    picture: 'https://picsum.photos/200'
                }
            ]
        }
    }
}
</script>