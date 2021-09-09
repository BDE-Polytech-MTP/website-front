<template>
  <BuilderNewUser
    v-if="$auth.loggedIn && $auth.user.roles.length !== 0"
  >
  </BuilderNewUser>
  <h1
    v-else
  >
    Vous n'êtes pas autorisé à être ici !
  </h1>
</template>

<script>

import website from '~/static/website.json';
import gql from 'graphql-tag';
import BuilderNewUser from '~/components/BuilderNewUser';

export default {
  components: { BuilderNewUser },
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
      components: website.equipe,
      me: {},
    };
  },
  methods: {
    checkUserRoles(usersRoles) {
      let valid = false;
      for (let i = 0; i < usersRoles.length; i++)
        valid = valid || usersRoles[i] == "WRITE_USERS";

      return valid;
    },
  }
};
</script>
