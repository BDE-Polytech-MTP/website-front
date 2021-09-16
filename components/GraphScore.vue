
<template>
  <section class="container">
    <article class="section is-medium" >
      <Barchart @load="changeLoad" :chartData="barChartData" :options="barChartOptions"  class="graph" />
      <b-loading id="load" :is-full-page="isFullPage" v-model="isLoading"></b-loading>
    </article>
  </section>
</template>

<script>

import Article from "~/components/Article";
import Barchart from "~/components/Barchart";

export default {
  name: "GraphScore",
  components: { Barchart,  Article },

  data(){
    return{
      isFullPage: true,
      isLoading: true,

      barChartData: {
        labels: [],
        datasets: [
          {
            label: 'Point',
            data: [],
            backgroundColor: ['#000000','#52d8f2','#ffffff','#ff0000','#1d29ab','#6e6e6e','#ffd414','#009e0d'],
            borderRadius: 2000,
            borderWidth: 2,
            borderSkipped: false,

          },

        ]
      },
      barChartOptions: {
        responsive: true,
        legend: {
          display: false
        },
        aspectRatio:2,
        maintainAspectRatio:false,

        title: {
          display: true,
          text: 'Score',
          fontSize: 48,
          fontColor: '#6b7280'
        },
        tooltips: {
          backgroundColor: '#17BF62'
        },
        scales: {
          xAxes: [
            {

              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              display:false,
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                display: false
              }
            }
          ]
        }
      }
    }
  },
  methods : {
    changeLoad(){
      this.isLoading=false;
    }
  }

};

</script>

<style scoped>

div{
  margin: 20px;
}
.graph{
  max-height: 600px;
  margin-right: auto;
  margin-left: auto;
}

</style>
