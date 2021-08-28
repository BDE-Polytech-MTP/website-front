<template>
  <tr>
    <td>{{ firstName }}</td>
    <td>{{ lastName }}</td>
    <td>{{ mail }}</td>
    <td>
      &#10024;
        <button
          class="button is-success is-normal"
          @click='accept'
        >&#x2714;</button>
        <button
          class="button is-danger is-normal"
          @click='decline'
        >&#x2718;</button>
      &#10024;
    </td>
  </tr>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'NewUser',
  props: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mail: { type: String, required: true },
  },
  methods: {
    accept () {
      console.log(this.mail);
      if (confirm("Vous êtes sur le point de valider " + this.firstName + " " + this.lastName + "\n Voulez-vous confirmer ?")) {
        let apolloReturn = this.$apollo.mutate({
          mutation: gql`mutation ($mail: String!) {
          validateUser(mail:$mail) {
            email
          }
        }`,
          variables: {
            mail: this.mail
          }
        });
        this.$emit('update'); //On emet la mise à jour à BuilderNewUser
        return apolloReturn;
      } else {
        return null;
      }
    },
    decline () {
      console.log(this.mail);
      if (confirm("Vous êtes sur le point de refuser la demande de " + this.firstName + " " + this.lastName + "\n Voulez-vous confirmer ?")) {
        let apolloReturn = this.$apollo.mutate({
          mutation: gql`mutation ($mail: String!) {
          deleteUser(mail:$mail) {
            email
          }
        }`,
          variables: {
            mail: this.mail
          }
        });
        this.$emit('update'); //On emet la mise à jour à BuilderNewUser
        return apolloReturn;
      } else {
        return null;
      }
    },
  }
};
</script>

<style scoped>

</style>
