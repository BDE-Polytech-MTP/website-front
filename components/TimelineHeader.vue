<template>
    <header class="timeline-header">
        <span class="tag" :class="[
            type != undefined ? `is-${type}` : 'is-primary',
            size != undefined ? `is-${size}` : 'is-small'
        ]">{{ title }}</span>
    </header>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    date: { type: String, required: true },
    dateFormat: { type: Object, required: false },

    type: { type: String, required: false,
      validator: function (value) {
        // La valeur passée doit être l'une de ces chaines de caractères
        return ["primary", "info", "success", "warning", "danger", "link"].indexOf(value) !== -1
      }
    },
    size: { type: String, required: false,
      validator: function (value) {
        // La valeur passée doit être l'une de ces chaines de caractères
        return ["small", "medium", "large"].indexOf(value) !== -1
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
