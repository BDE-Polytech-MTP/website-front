<template>
    <div class="card">
      <header class="card-header">
        <p class="card-header-title is-centered" name="posteTrombi">
          {{poste}}
        </p>
      </header>
      <div class="card-image">
        <div >
            <p name="texteTrombi">
              <strong>{{name}}</strong><br><br><br>
           <a v-if="url" :href="url">Lien: Facebook</a> </p>
        </div>
        <figure class="image is-2by3">
          <img name="imageTrombi" :src="require(`~/assets/trombinoscope/${picture}`)" :alt="`${picture}`">
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

let counter=0;
document.addEventListener('keypress',key);
function key(e){
  const text="brocoloc"
  if(text[counter]==e.key){
    counter++;
    if (counter==text.length){
      let poste=document.getElementsByName("posteTrombi");
      let texte=document.getElementsByName("texteTrombi");
      let photo=document.getElementsByName("imageTrombi");
      for(let cpt=0;cpt<poste.length;cpt++){
        setTimeout(()=>{
          texte[cpt].innerHTML="<strong style='color: white'>Brocoloc</strong><br><br><br>Lien: <a style='color: white;text-decoration: underline' href='https://www.brocoloc.com'>Site</a>";
          photo[cpt].setAttribute("src","https://drive.google.com/uc?export=view&id=1NaD1JQoDJPzyb38JNf9FheJO3hHrwjUx");

        },1000*cpt);
      }
    }
  }else {
    counter=0;
  }
}

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
