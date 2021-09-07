<template>
  <section>
    <b-field grouped group-multiline>
      <b-button
        label = "Désélectionner"
        type="is-info"
        icon-left="close"
        class="field"
        @click="checkedRows = []" />

      <b-field>
        <b-button
          label = "Valider"
          type="is-primary"
          icon-left="close"
          class="field"
          @click="accept" />

        <b-button
          label = "Refuser"
          type="is-danger"
          icon-left="close"
          class="field"
          @click="decline" />

      </b-field>
    </b-field>

    <b-tabs>
      <b-tab-item label="Étudiants">
        <b-table
          checkable
          :data="allUsers"
          :columns="columns"
          :checked-rows.sync="checkedRows"
          :checkbox-position="checkboxPosition">

          <template #bottom-left>
            <b>Nombre d'étudiants sélectionnés </b>: {{ checkedRows.length }}
          </template>
        </b-table>
      </b-tab-item>

      <!--      <b-tab-item label="Checked rows">-->
      <!--        <pre>{{ checkedRows }}</pre>-->
      <!--      </b-tab-item>-->
    </b-tabs>
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  name: 'BuilderNewUser',
  apollo: {
    allUsers: gql`{
      allUsers {
        firstname,lastname,email
      }
    }`,
  },
  data() {
    return {
      allUsers : [],
      checkboxPosition: 'left',
      checkedRows: [],
      columns: [
        {
          field: 'firstname',
          label: 'Prénom',
        },
        {
          field: 'lastname',
          label: 'Nom de famille',
        },
        {
          field: 'email',
          label: 'Email',
        },
      ]
    }
  },

  methods: {
    async accept() {
      for (let i = 0; i < this.checkedRows.length; i++) {
        await this.$apollo.mutate({
          mutation: gql`mutation ($mail: String!) {
            validateUser(mail:$mail) {
              email
            }
          }`,
          variables: {
            mail: this.checkedRows[i].email
          }
        });
      }
    },
    async decline () {
      for (let i = 0; i < this.checkedRows.length; i++) {
        await this.$apollo.mutate({
          mutation: gql`mutation ($mail: String!) {
            deleteUser(mail:$mail) {
              email
            }
          }`,
          variables: {
            mail: this.checkedRows[i].email
          }
        });
      }
    },
  }
}
</script>
