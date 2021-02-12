<template>
  <main>
    <Article
      :title="bureau.nom"
      subtitle="Bureaux"
      :contents="[bureau.description]"
      :startWithImage="bureau.nom.length % 2 == 0"
      :picture="bureau.photo"
    >
    </Article>
    <Numbers
      :content="bureau.nombres"
      :theme="bureau.theme"
      v-if="bureau.nombres"
    />
    <ImageSection :src="bureau.organigramme" v-if="bureau.organigramme" />
  </main>
</template>

<script>
import hydration from "~/static/data.json";

export default {
  data() {
    return {
      bureau: null,
    };
  },
  beforeMount() {
    this.bureau = hydration.bureaux.elements.filter((elt) => {
      return elt.id == this.$route.params.id;
    })[0];
  },
};
</script>

<style lang="css">
</style>