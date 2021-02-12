<template>
  <main>
    <Article
      :title="association.nom"
      :subtitle="'Associations ' + group.type.toLowerCase()"
      :contents="[association.description]"
      :startWithImage="association.nom.length % 2 == 0"
      :picture="association.photo"
    >
      <ul>
        <li class="subtitle is-size-6 my-2" v-if="association.horaires">
          🕒 : <strong>{{ association.horaires }}</strong>
        </li>
        <li class="subtitle is-size-6 my-2" v-if="association.lieu">
          📌 : <strong>{{ association.lieu }}</strong>
        </li>
        <li class="subtitle is-size-6 my-2">
          📣 : <strong>{{ association.responsable }}</strong>
        </li>
      </ul>
    </Article>
    <aside
      class="hero is-primary is-bold"
      v-if="association.horaires || association.lieu"
    >
      <div class="hero-body has-text-centered">
        <p class="title is-1">{{ association.horaires }}</p>
        <p class="subtitle">{{ association.lieu }}</p>
      </div>
    </aside>
    <Members
      title="La fine équipe"
      subtitle="Membres"
      :map="association.gmap ? association.gmap : null"
      :members="association.membres"
    />
  </main>
</template>

<script>
import hydration from "~/static/data.json";
export default {
  name: "associations_id",
  data() {
    return {
      association: null,
      group: null,
    };
  },
  beforeMount() {
    hydration.associations.elements.forEach((type) => {
      type.elements.forEach((elt) => {
        if (elt.nom.toLowerCase().replace(" ", "-") == this.$route.params.id) {
          this.association = elt;
          this.group = { type: type.type, emoji: type.emoji };
        }
      });
    });
  },
};
</script>
