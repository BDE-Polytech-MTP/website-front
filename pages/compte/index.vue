<template>
  <div>{{ $auth.user }}</div>
</template>

<script>
import gql from 'graphql-tag'

export default {

  apollo: {
    me: {
      query: gql`query { me { firstname } }`
    }
  },

  data() {
    return {
      me: {}
    }
  }

};
</script>

<style lang="css" scoped>
</style>