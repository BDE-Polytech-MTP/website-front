<template>
  <div class="modal-card" style="width: auto; min-width: 25vw">
    <form v-on:submit="signIn($event)">

      <header class="modal-card-head">
        <p class="modal-card-title">Inscription</p>
        <button type="button" class="delete" @click="$emit('close')" />
      </header>

      <section class="modal-card-body">
        <InputField
          id="emailLogin"
          label="Adresse e-mail"
          icon="email-outline"
          message="Adresse invalide"
          @update="emailUpdate"
          :validator="emailValidator"
          required
        />

        <InputField
          id='firstName'
          label='Prénom'
          icon='account'
          message='Taille invalide'
          @update='firstNameUpdate'
          :validator='firstNameValidator'
          required
        />

        <InputField
          id='lastName'
          label='Nom de famille'
          icon='account'
          message='Taille invalide'
          @update='lastNameUpdate'
          :validator='lastNameValidator'
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
          label="Valider"
          value="Valider"
          type="is-primary"
          tag="input"
          native-type="submit"
          :disabled="isDisabled"
        />
      </footer>
    </form>
  </div>
</template>

<script>
import { mailValidation, firstnameValidation, lastnameValidation } from '~/plugins/validators';
import InputField from '~/components/InputField';
import gql from 'graphql-tag';
export default {
  name: 'SignIn',
  components: { InputField },
  data() {
    return {
      isLoading: false,
      email: {
        valid: false,
        value: null,
      },
      firstName: {
        valid: false,
        value: null,
      },
      lastName: {
        valid: false,
        value: null
      },
    };
  },
  computed: {
    emailValidator() {
      return mailValidation;
    },
    firstNameValidator () {
      return firstnameValidation;
    },
    lastNameValidator() {
      return lastnameValidation;
    },
    isDisabled() {
      return !this.email.valid || !this.firstName.valid || !this.lastName.valid ;
    },
  },
  methods: {
    emailUpdate(valid, value) {
      this.email.valid = valid;
      this.email.value = value;
    },
    firstNameUpdate(valid, value) {
      this.firstName.valid = valid;
      this.firstName.value = value;
    },
    lastNameUpdate(valid, value) {
      this.lastName.valid = valid;
      this.lastName.value = value;
    },

    signIn(event) {
      if (event) {
        event.preventDefault();
      }
      if (!this.isDisabled) {
        this.isLoading = true;
        this.$apollo
          .mutate({
            mutation: gql`
            mutation(
              $mail: String!,
              $firstN: String!,
              $lastN: String!
            ) {
              newAccount(mail: $mail, firstN: $firstN, lastN: $lastN) {
                bdeId
              }
            }
          `,
            variables: {
              mail: this.email.value,
              firstN: this.firstName.value,
              lastN: this.lastName.value,
            },
          })
          .then(() => {
            this.$buefy.toast.open({
              message: 'Votre compte à bien été crée',
              type: 'is-success',
            });
            this.$emit('signin');
          })
          .catch((e) => {
            console.error(e);
            this.$buefy.toast.open({
              message: 'Une erreur est survenue ici',
              type: 'is-danger',
            });
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
  },
};
</script>
