<template>
    <div class="timeline-item" :class="[item_type == undefined ? 'is-primary' : `is-${item_type}`]">
        <div class="timeline-marker" :class="[
            image != undefined ? 'is-image is-32x32' : '',
            marker_type == undefined ? 'is-primary' : `is-${marker_type}`,
            icon != undefined ? 'is-icon' : '',
        ]">
            <img v-if="image != undefined" :src="image">
            <b-icon v-if="icon != undefined"
                :icon="icon"
                size="is-small">
            </b-icon>
        </div>

        <div class="timeline-content">
            <p class="heading">{{ dateConverted.toLocaleString('fr-FR', dateOptions) }}</p>
            <p>{{ title }}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    date: { type: String, required: true },
    options: { type: Object, required: false },
    image: { type: String, required: false },
    icon: { type: String, required: false },
    marker_type: { type: String, required: false, 
      validator: function (value) {
        // La valeur passée doit être l'une de ces chaines de caractères
        return ["primary", "info", "success", "warning", "danger", "link"].indexOf(value) !== -1
      }
    },
    item_type: { type: String, required: false, 
      validator: function (value) {
        // La valeur passée doit être l'une de ces chaines de caractères
        return ["primary", "info", "success", "warning", "danger", "link"].indexOf(value) !== -1
      }
    },
  },
  computed: {
    dateOptions: function(){return this.options ? this.options : {year: 'numeric', month: 'long', day: 'numeric'}},
    dateConverted: function(){return new Date(this.date)}
  }
};
</script>

<style lang="css" scoped>
</style>