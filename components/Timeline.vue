<template>
    <section class="container">
        <article class="section is-medium" >
            <div class="timeline">
                <TimelineHeader
                title="Début"
                date="0000-00-00T00:00:00.000Z"
                type="primary"
                size="medium"
                />

                <div v-for="(item, index) in orderedItems" v-bind:key="index">
                    <TimelineHeader
                    v-if="typeOf(item) == 'timelineheader'"
                    :title="item.timelineheader.title"
                    :date="item.timelineheader.date"
                    :dateFormat="item.timelineheader.dateFormat"
                    :type="item.timelineheader.type"
                    :size="'small'"
                    />


                    <TimelineItem
                    v-else
                    :title="item.timelineitem.title"
                    :date="item.timelineitem.date"
                    :dateFormat="item.timelineitem.dateFormat"
                    :image="item.timelineitem.image"
                    :icon="item.timelineitem.icon"
                    :marker_type="item.timelineitem.marker_type"
                    :item_type="item.timelineitem.item_type"
                    />
                </div>

                <TimelineHeader
                title="Fin"
                date="0000-00-00T00:00:00.000Z"
                type="primary"
                size="medium"
                />
            </div>
        </article>
    </section>
</template>


<script>
export default {
  props: {
    items: { type: Array, required: true, default: () => new Array() },
  },
  methods: {
    typeOf(item) {
      return Object.keys(item)[0].toLowerCase();
    },
  },
  computed: {
    orderedItems: function(){
      return this.items.sort((a, b) => {
        if(a.timelineitem){
          a = a.timelineitem
        } else {
          a = a.timelineheader
        }
        if(b.timelineitem){
          b = b.timelineitem
        } else {
          b = b.timelineheader
        }
        return (new Date(a.date) > new Date(b.date)) ? 1 : -1
      })
    }
  }
};
</script>

<style lang="css" scoped>
</style>
