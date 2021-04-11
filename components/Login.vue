<template>
  <div class="modal-card" style="width: auto; min-width: 25vw">
    <form v-on:submit="login($event)">
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
        <b-loading
          v-model="isLoading"
          :is-full-page="false"
          :can-cancel="false"
        />
      </section>
      <footer class="modal-card-foot">
        <b-button label="Retour" @click="$emit('close')" />
        <b-button
          label="Se connecter"
          value="Se connecter"
          type="is-primary"
          tag="input"
          native-type="submit"
          :disabled="isDisabled"
        />
        <b-button
          label="Mot de passe oublié"
          @click="forgotPassword()"
          type="is-text"
        />
      </footer>
    </form>
  </div>
</template>

<script>
import { mailValidation, passwordValidation } from '~/plugins/validators';
export default {
  name: 'Login',
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
    login(event) {
      if (event) {
        event.preventDefault();
      }
      if (!this.isDisabled) {
        this.isLoading = true;
        this.$auth
          .loginWith('local', {
            data: {
              username: this.email.value,
              password: this.password.value,
            },
          })
          .then(() => {
            this.$emit('login');
          })
          .catch(() => {
            this.$buefy.toast.open({
              message: 'Impossible de se connecter au serveur ❌',
              type: 'is-danger',
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    forgotPassword() {
      this.$emit('close');
      this.$router.push('/compte/demande-reset-mot-de-passe');
    },
  },
};
</script>
