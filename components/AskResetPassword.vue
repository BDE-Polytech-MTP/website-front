<template>
  <div class="modal-card" style="width: auto; min-width: 25vw">
    <header class="modal-card-head">
      <p class="modal-card-title">Demande de reset de mot de passe</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <InputField
        id="emailReset"
        label="Adresse e-mail"
        icon="email-outline"
        message="Adresse invalide"
        :expanded="true"
        @update="emailUpdate"
        :validator="emailValidator"
        required
      />
      <b-loading
        v-model="isLoading"
        :is-full-page="false"
        :can-cancel="false"
      />
    </section>
    <footer class="modal-card-foot">
      <b-button label="Retour" @click="$emit('close')" />
      <b-button
        @click="askForResetEmail()"
        label="Envoyer le mail"
        type="is-primary"
        :disabled="isDisabled"
      />
    </footer>
  </div>
</template>

<script>
import { mailValidation } from "~/plugins/validators";
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      email: {
        valid: false,
        value: null,
      },
      password: {
        valid: false,
        value: null,
      },
    };
  },
  computed: {
    emailValidator() {
      return mailValidation;
    },
    isDisabled() {
      return !this.email.valid;
    },
  },
  methods: {
    emailUpdate(valid, value) {
      this.email.valid = valid;
      this.email.value = value;
    },
    askForResetEmail() {
      if (!this.isDisabled) {
        this.isLoading = true;
        this.$axios
          .post('/api/account/password-reset/send', {
              email: this.email.value
          })
          .then(() => {
            this.$emit("sent");
          })
          .catch(() => {
            this.$buefy.toast.open({
              message: "Une erreur est survenue, votre compte n'a pas été validé ❌",
              type: "is-danger",
            });
            this.$emit("close");
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>
