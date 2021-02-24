<template>
  <section class="container">
    <b-steps
      v-model="activeStep"
      :animated="true"
      :rounded="true"
      :has-navigation="false"
      label-position="bottom"
      mobile-mode="compact"
    >
      <b-step-item step="1" label="Vérification" :clickable="false" :type="state.validationState">
        <h1 class="title has-text-centered">Vérification de la validité du lien</h1>
        <p v-if="state.errored" class="has-text-centered has-text-danger is-size-5">
          Ce lien est invalide. Les liens de redéfinition de mot de passe ne sont valables que 24h. Se peut-il que votre lien soit expiré ?<br>
          <NuxtLink to="/">Retour à l'accueil</NuxtLink>
        </p>
        <p v-else class="has-text-centered is-size-5 has-text-primary">
          Envoie d'une demande au serveur ...
        </p>
      </b-step-item>

      <b-step-item
        step="2"
        label="Reset"
        :clickable="false"
        :type="state.resetState"
      >
        <h1 class="title has-text-centered">Redéfinition du mot de passe</h1>
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
        <b-button
          @click="reset()"
          label="Réinitialiser mon mot de passe"
          type="is-primary"
          :disabled="isDisabled"
        />

        <p v-if="state.errored" class="has-text-centered has-text-danger" style="padding-top: 10px">
          Il semblerait que nous n'ayons pas pu redéfinir votre mot de passe. Votre lien a peut-être expiré
          pendant que vous remplissiez le formulaire. Rafraichissez la page et si le problème persiste, contactez un administrateur.
          <NuxtLink to="/">Retour à l'accueil</NuxtLink>
        </p>
      </b-step-item>

      <b-step-item
        step="3"
        label="Terminé"
        :clickable="false"
        :type="state.finishState"
      >
        <h1 class="title has-text-centered">Terminé</h1>
        <p class="has-text-centered">
          Votre mot de passe a bien été changé. Vous pouvez maintenant vous connecter.
        </p>
      </b-step-item>
    </b-steps>
  </section>
</template>

<script>
import { passwordValidation } from "~/plugins/validators";

const FormState = {
  CHECKING: {
    validationState: undefined
  },
  TOKEN_VALID: {
    validationState: 'is-success',
  },
  TOKEN_INVALID: {
    validationState: 'is-danger',
    errored: true,
  },
  SENDING: {
    validationState: 'is-success',
  },
  FINISHED: {
    validationState: 'is-success',
    resetState: 'is-success',
    finishState: 'is-success'
  },
  UNABLE_TO_RESET: {
    validationState: 'is-success',
    resetState: 'is-warning',
    errored: true
  }
};

export default {
  middleware: 'reset-password-valid-token',
  data() {
    return {
      token: String,
      state: FormState.CHECKING,
      activeStep: 0,
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
        this.state = FormState.SENDING;
        this.$axios.post('/api/account/password-reset/reset?token=' + this.token, {
          password: this.password.value
        }).then(() => {
          this.state = FormState.FINISHED;
          this.activeStep = 2;
        }).catch(() => {
          this.state = FormState.UNABLE_TO_RESET;
        });
      }
    }
  },
  created() {
    this.token = this.$route.query.token;
    this.state = FormState.CHECKING;
    this.$axios
      .get('/api/account/password-reset/check?token=' + this.token)
      .then((response) => {
        if (response.status === 200 && response.data.valid) {
          this.state = FormState.TOKEN_VALID;
          this.activeStep = 1;
        } else {
          this.state = FormState.TOKEN_INVALID;
        }
      })
      .catch(() => {
        this.state = FormState.TOKEN_INVALID;
      });
  },
};
</script>

<style lang="css" scoped>
</style>