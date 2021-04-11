<template>
  <section class="container">
    <h1 class="title is-1">Mon compte</h1>
    <form>
      <b-field label="BDE">
        <b-select disabled v-model="$auth.user.bde.id">
          <option selected :value="$auth.user.bde.id" :key="$auth.user.bde.id">
            {{ $auth.user.bde.name }}
          </option>
        </b-select>
      </b-field>
      <InputField
        label="Prénom"
        :value="$auth.user.firstname"
        :disabled="true"
      />
      <InputField
        label="Nom de famille"
        :value="$auth.user.lastname"
        :disabled="true"
      />
    </form>
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    me: {
      query: gql`
        query {
          me {
            firstname
          }
        }
      `,
    },
  },

  data() {
    return {
      me: {},
    };
  },
};
</script>

<style lang="css" scoped>
</style>