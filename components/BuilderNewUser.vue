<template>
  <table class="table is-fullwidth">
    <thead>
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tfoot>
    <tr>
      <th>Prénom</th>
      <th>Nom</th>
      <th>Email</th>
      <th>Actions</th>
    </tr>
    </tfoot>
    <tbody>
    <NewUser
      v-for="(user, index) in allUsers"
      v-bind:key="`members-${index}`"
      :id = "user.id"
      :firstName = "user.firstname"
      :lastName = "user.lastname"
      :mail = "user.email"
    />
    </tbody>
  </table>
</template>

<script>
import gql from 'graphql-tag';
import NewUser from '~/components/NewUser';

export default {
  name: 'BuilderNewUser',
  components: { NewUser },
  apollo: {
    allUsers: gql`{
      allUsers {
        firstname,lastname,roles,email
      }
    }`,
  },

  data() {
    return {
      allUsers: {}
    }
  },

  methods: {
    async update() {
      console.log("update");
      console.log(this.allUsers);
      this.$apollo.query(
        gql`{
          allUsers {
            firstname,lastname,roles,email
          }
        }`
      ).then(r => this.allUsers = r);
      console.log(this.allUsers);
    }
  }
};
</script>

<style scoped>

</style>
