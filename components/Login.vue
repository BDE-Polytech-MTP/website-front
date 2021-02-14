<template>
  <div class="modal-card" style="width: auto; min-width: 25vw">
    <header class="modal-card-head">
      <p class="modal-card-title">Connexion</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <section class="modal-card-body">
      <InputField
        id="emailLogin"
        label="Adresse e-mail"
        icon="email-outline"
        message="Adresse invalide"
        :expanded="true"
        @update="emailUpdate"
        :validator="emailValidator"
        required
      />

      <InputField
        id="passwordLogin"
        label="Mot de passe"
        icon="lock-outline"
        message="Doit contenir 8 caractères dont 1 chiffre et 1 symbole"
        type="password"
        @update="passwordUpdate"
        :validator="passwordValidator"
        expanded
        passwordReveal
        required
      />
    </section>
    <footer class="modal-card-foot">
      <b-button label="Retour" @click="$emit('close')" />
      <b-button
        @click="login()"
        label="Se connecter"
        type="is-primary"
        :disabled="isDisabled"
      />
    </footer>
  </div>
</template>

<script>
import { mailValidation, passwordValidation } from "~/plugins/validators";
export default {
  name: "Login",
  data() {
    return {
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
    passwordValidator() {
      return passwordValidation;
    },
    isDisabled() {
      return !this.email.valid || !this.password.valid;
    },
  },
  methods: {
    emailUpdate(valid, value) {
      this.email.valid = valid;
      this.email.value = value;
    },
    passwordUpdate(valid, value) {
      this.password.valid = valid;
      this.password.value = value;
    },
    updateButton() {
      this.button.disabled = !(this.password.valid && this.email.valid);
    },
    login() {
      if (this.email.valid && this.password.valid) {
        this.$auth.loginWith("local", {
          data: {
            username: this.email.value,
            password: this.password.value,
          },
        }).then(() => {
          this.$emit("login");
        })
      }
    },
  },
};
</script>
