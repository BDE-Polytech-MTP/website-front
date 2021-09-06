<template>
  <section class="container section is-medium">

      <div v-for="defi in defis" v-bind:key="defi.title" class="Pmargin">
        <ScoreCatégorie
          :title="defi.title"
          :data="defi.data"
          :property="columns"
        />
      </div>
  </section>
</template>

<script>
import ScoreCatégorie from "~/components/ScoreboardCategorie";
export default {
  name: "Scoreboard",
  components: { ScoreCatégorie },
  props:{
    "title":{type:String,required:false},
    "idsheet":{type:String,required: true},
    "numberTeam":{required:true}
  },

  data() {
    return {
      defis:[],

      columns: [
        {
          field: 'defi',
          label: 'Défi',
        },
        {
          field: 'point',
          label: 'Points',
          width: '40',
          centered: true
        },

      ]
    }
  },
  beforeMount() {
    fetch("https://docs.google.com/spreadsheets/d/"+this.idsheet+"/gviz/tq?tqx=out:json").then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substr(47).slice(0, -2));;

        let categorie={
          title:json.table.cols[0].label.substring(9),
          data:[]
        }
        let nameOfTheTeam=[];

        for (let i=2;i<this.numberTeam+2;i++){
          let name={field:"",label:"",centered: true}
          nameOfTheTeam.push(json.table.cols[i].label);
          name.field=json.table.cols[i].label
          name.label=json.table.cols[i].label
          this.columns.push(name)
        }

        for(let a of json.table.rows){
          if(a.c[0].v.substring(0,9)=='Catégorie'){
            this.defis.push(categorie);

            categorie= {
              title: a.c[0].v.substring(9),
              data: []
            }
          }
          else if(a.c[0].v=='Total'){
            this.defis.push(categorie);
          }
          else {

            let val=0
            let donnee={}
            for (let info of a.c) {
              if(val==0){
                donnee["defi"] = info.v;
                val++;

              }
              else if(val==1){
                donnee["point"] = info.v;
                val++;

              }
              else{
                if (info == null) {
                  donnee[nameOfTheTeam[val - 2]] = 0;
                } else {
                  donnee[nameOfTheTeam[val - 2]] = info.v;
                }
                val++;
              }
            }
            categorie.data.push(donnee);
          }
        }
      })




  }




};
</script>

<style scoped>
.Pmargin{
  margin-bottom: 10px;
}

</style>
