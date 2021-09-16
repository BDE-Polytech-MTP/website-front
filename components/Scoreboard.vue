<template>
  <section class="container">

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
          width: '20',
          centered: true
        },
        {
          field: 'par',
          label: 'Par',

          centered: true
        },

      ]
    }
  },
  mounted() {
    fetch(
      'https://script.google.com/macros/s/AKfycbycPG6g2-mBcCw1_osjhlHCRXUnjKUIsyHZUxE4LRNLP43UB6xP6dx9HZONRw0VwEsY/exec',
    )
      .then(response => response.body)
      .then(rb => {
        const reader = rb.getReader();
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then( ({done, value}) => {
                // If there is no more data to read
                if (done) {
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);

                push();
              })
            }
            push();
          }
        });
      })
      .then(stream => {
        // Respond with our stream
        return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
      })
      .then(result => {

        console.log(result)
        let first =false;
        let nameOfTheTeam=[];
        let categorie={
          title:"",
          data:[]
        }
        console.log(nameOfTheTeam)

        for( let line of JSON.parse(result).GoogleSheetdata) {
          if(line[0]=='Team') {
            for (let i=3;i<=10;i++){
              nameOfTheTeam.push(line[i]);
              this.columns.push({field: line[i],label:line[i],centered: true})
            }
            console.log(nameOfTheTeam)
          }
          else if(line[0].substring(0,9)=='Catégorie'){
            if(first){
              console.log(categorie)
              this.defis.push(categorie);
            }
            first=true;
            categorie= {
              title: line[0].substring(9),
              data: []
            }
          }

          else if(line[0]=="Total" || line[0]==""){}

          else{
            let val=0
            let donnee={}
            for (let info of line) {
              if(val==0){
                donnee["defi"] = info;
                val++;

              }
              else if(val==1){
                donnee["point"] = info;
                val++;

              }
              else if(val==2){
                donnee["par"] = info;

                val++;

              }
              else{
                if (info == "") {
                  donnee[nameOfTheTeam[val - 3]] = 0;
                } else {
                  donnee[nameOfTheTeam[val - 3]] = info;
                }
                val++;
              }
            }
            console.log(donnee)
            categorie.data.push(donnee);


          }


        }this.defis.push(categorie);

      });


  }




};
</script>

<style scoped>
.Pmargin{
  margin-bottom: 10px;
}

</style>
