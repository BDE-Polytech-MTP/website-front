<template>
  <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3" :open="false">
    <template #trigger="props">
      <div
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3">
        <p class="card-header-title ">
          {{ title }}
        </p>
        <a class="card-header-icon">
          <b-icon
            :icon="props.open ? 'menu-down' : 'menu-up'">
          </b-icon>
        </a>
      </div>
    </template>

    <div class="card-content">
      <div class="content">
        <b-table  :data="data" :columns="property" >
          <template #empty>
            <div class="has-text-centered">Pas de donnée</div>
          </template>

        </b-table>
      </div>
    </div>

  </b-collapse>

</template>

<script>
export default {
  name: "ScoreCatégorie",
  props:{
    "title":{type: String},
    "data":{type: Array},
    "property":{type:Array}
  },
  data(){
    return{


    }
  },

};
</script>

<style scoped>



</style>
