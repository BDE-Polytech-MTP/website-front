<template>
  <div class="modal-card" style="width: auto; min-width: 25vw">
    <header class="modal-card-head">
      <p class="modal-card-title">Réinitialisation mot de passe</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <InputField
        id="passwordReset"
        label="Nouveau mot de passe"
        icon="lock-outline"
        message="Doit contenir 8 caractères dont 1 chiffre et 1 symbole"
        type="password"
        @update="passwordUpdate"
        :validator="passwordValidator"
        expanded
        passwordReveal
        required
      />
      <InputField
        id="passwordResetConfirm"
        label="Confirmation"
        icon="lock-outline"
        message="Doit contenir 8 caractères dont 1 chiffre et 1 symbole"
        type="password"
        @update="passwordConfirmUpdate"
        :validator="passwordValidator"
        expanded
        passwordReveal
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
        @click="reset()"
        label="Réinitialiser"
        type="is-primary"
        :disabled="isDisabled"
      />
    </footer>
  </div>
</template>

<script>
import { passwordValidation } from "~/plugins/validators";
export default {
  props: {
    token: { type: String, required: true }
  },
  name: "ResetPassword",
  data() {
    return {
      isLoading: false,
      passwordConfirm: {
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
    passwordValidator() {
      return passwordValidation;
    },
    isDisabled() {
      return (
        !this.passwordConfirm.valid ||
        !this.password.valid ||
        this.passwordConfirm.value != this.password.value
      );
    },
  },
  methods: {
    passwordUpdate(valid, value) {
      this.password.valid = valid;
      this.password.value = value;
    },
    passwordConfirmUpdate(valid, value) {
      this.passwordConfirm.valid = valid;
      this.passwordConfirm.value = value;
    },
    reset() {
      if (!this.isDisabled) {
        this.isLoading = true;
        this.$axios.post('/api/account/password-reset/reset?token=' + this.token, {
          password: this.password.value
        }).then(() => {
          this.$emit("resetPassword");
        }).finally(() => {
          this.isLoading = false;
        })
      }
    },
  },
};
</script>
