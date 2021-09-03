<template>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title is-centered">
          {{poste}}
        </p>
      </header>
      <div class="card-image">
        <div >
            <p>
              <strong>{{name}}</strong><br><br><br>
           <a v-if="url" :href="url">Lien: Facebook</a> </p>
        </div>
        <figure class="image is-2by3">
          <img  :src="require(`~/assets/trombinoscope/${picture}`)" :alt="`Photo du trombinoscope du ${poste}`">
        </figure>
      </div>

    </div>

</template>

<script>
export default {
  name: "CardTrombinoscope",
  props:{
    poste:{type:String ,required: false , default:"Job not found"},
    picture :{type:String, required: false,default:"error.jpg" },
    url:{type:String,required:false},
    name:{type:String,required:false,default:"Name not found"
    }

  },

};


</script>

<style scoped>

.card-image:hover>div {
  visibility: visible;
  background: rgba(0, 174, 239, 0.9);
  transition-duration: 0.6s;

}
.card-image:hover>div p{
  transform: translateY(0%);
  transition-duration: 0.6s;
}
a{
  color: white;
  text-decoration:underline;
}
.card-image div p{
  transform: translateY(80%);
  margin: auto;
}
div .card-image div{
  position: absolute;
  visibility: hidden;
  display: flex;
  font-size: x-large;
  color:white;
  text-align: center;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  z-index:1;
}
p strong{
  color: white;
}
.card{
  box-shadow: 0 0 100px grey;
}




</style>
