<template>
  <div class="modal-card" style="width: auto">
    <header class="modal-card-head">
      <p class="modal-card-title">Édition du nombre {{ numberWordPrefix }}</p>
      <button type="button" class="delete" @click="$parent.close()" />
    </header>
    <section class="modal-card-body">
      <b-field :label="`Nombre ${numberWordPrefix}`">
        <b-numberinput :disabled="unlimited" v-model="value" :min="0" />
      </b-field>
      <b-field>
        <b-checkbox v-model="unlimited">{{
          isFemale ? 'Illimitées' : 'Illimités'
        }}</b-checkbox>
      </b-field>

      <b-button label="Annuler" @click="$parent.close()" />
      <b-button type="is-primary" label="Valider" @click="submit()" />
    </section>
  </div>
</template>

<script>
export default {
  props: {
    currentValue: { type: Number, required: true },
    numberWordPrefix: { type: String, required: true },
    isFemale: { type: Boolean, default: false },
  },
  data() {
    return {
      value: Math.max(this.currentValue, 0),
      unlimited: this.currentValue < 0,
    };
  },
  methods: {
    submit() {
      this.$emit('onSubmit', this.unlimited ? -1 : this.value);
      this.$parent.close();
    },
  },
};
</script>