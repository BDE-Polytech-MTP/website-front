<template>
  <div id="placesTable">
    <b-field>
      <b-checkbox v-model="membersOnly"
        >Événement réservé aux adhérents</b-checkbox
      >
    </b-field>
    <b-table :data="tableData">
      <b-table-column field="name" label="BDE" v-slot="props">
        {{ props.row.name }}
      </b-table-column>
      <b-table-column
        field="school"
        :label="`Places ${membersOnly ? 'adhérents' : 'Polytech'}`"
        v-slot="props"
      >
        <span
          :class="`tag ${
            props.row.school < 0
              ? 'is-success'
              : props.row.school > 0
              ? 'is-info'
              : ''
          }`"
          @click="editValue(props.row.id, 'school')"
        >
          {{ placeCountToLabel(props.row.school) }} 🖊️
        </span>
      </b-table-column>
      <b-table-column
        field="extern"
        :th-attrs="externPlacesAttrs"
        label="Places externes"
        v-slot="props"
      >
        <span
          :class="`tag ${
            membersOnly
              ? 'has-text-grey-light'
              : props.row.extern === 0
              ? ''
              : props.row.extern > 0
              ? 'is-info'
              : 'is-success'
          } ${membersOnly ? 'disabled' : ''}`"
          @click="editValue(props.row.id, 'extern')"
        >
          {{ placeCountToLabel(membersOnly ? 0 : props.row.extern) }}
          {{ membersOnly ? '' : '🖊️' }}
        </span>
      </b-table-column>
      <template #empty>
        <div class="has-text-centered has-text-grey">
          Pas encore de places définies pour cet événement
        </div>
      </template>
    </b-table>
  </div>
</template>

<style scoped>
#placesTable .tag:hover {
  cursor: pointer;
}
#placesTable .tag.disabled:hover {
  cursor: default;
}
</style>

<script>
import gql from 'graphql-tag';
import EditCountModal from './EditCountModal.vue';

export default {
  data() {
    return {
      allBDE: [],
      placesColumns: [
        {
          field: 'name',
          label: 'BDE',
        },
        {
          field: 'school',
          label: 'Places Polytech',
        },
        {
          field: 'extern',
          label: 'Places externes',
        },
      ],
      membersOnly: false,
      tableData: [],
    };
  },
  methods: {
    placeCountToLabel(count) {
      if (count < 0) return 'Illimitée';
      if (count === 0) return 'Aucune';
      return `${count} place${count > 1 ? 's' : ''}`;
    },
    editValue(bdeId, field) {
      if (field === 'extern' && this.membersOnly) return;

      this.$buefy.modal.open({
        component: EditCountModal,
        active: true,
        parent: this,
        hasModalCard: true,
        trapFocus: true,
        props: {
          currentValue: this.tableData.find((row) => row.id === bdeId)[field],
          numberWordPrefix: 'de places',
          isFemale: true,
        },
        events: {
          onSubmit: (newValue) => {
            this.tableData.find((row) => row.id === bdeId)[field] = newValue;
          },
        },
      });
    },
    externPlacesAttrs() {
      return this.membersOnly
        ? {
            class: 'has-text-grey-light',
          }
        : null;
    },
  },
  apollo: {
    allBDE: gql`
      query {
        allBDE {
          id
          name
        }
      }
    `,
  },
  watch: {
    allBDE() {
      if (this.allBDE.length && !this.tableData.length) {
        this.tableData = this.allBDE.map((bde) => ({
          name: bde.name,
          id: bde.id,
          school: 0,
          extern: 0,
        }));
      }
    },
    tableData() {
      this.$emit('onValid', {
        membersOnly: this.membersOnly,
        places: this.tableData,
      });
    },
    membersOnly() {
      this.$emit('onValid', {
        membersOnly: this.membersOnly,
        places: this.tableData,
      });
    },
  },
};
</script>