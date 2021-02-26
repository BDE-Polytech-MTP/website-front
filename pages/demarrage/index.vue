<template>
  <section class="container">
    <b-steps v-model="activeStep" :has-navigation="false">
      <b-step-item
        step="1"
        label="Vérification"
        :type="state.verificationState"
        :clickable="false"
      >
        <h1 class="title has-text-centered">
          Vérification qu'aucun BDE n'existe
        </h1>
      </b-step-item>

      <b-step-item 
        step="2" 
        label="BDE" 
        :type="state.bdeInfoState" 
        :clickable="false"
      >
        <h1 class="title has-text-centered">Informations sur le BDE</h1>
        <InputField
          id="bdeName"
          label="Nom de la ville"
          type="text"
          icon="school"
          :validator="(value) => value.length > 0 && value.length <= 40"
          required
          expanded
          @update="bdeNameUpdate"
        />

        <h2 class="subtitle has-text-centered">Spécialités</h2>

        <b-button
          label="Ajouter une spécialité"
          @click="createNewSpecialty()"
        />

        <b-button
            label="Supprimer"
            type="is-danger"
            :disabled="selectedSpecialty === null"
            @click="removeSelectedSpecialty()"
        />

        <b-button
            label="Éditer"
            type="is-text"
            :disabled="selectedSpecialty === null"
            @click="editSelectedSpecialty()"
        />

        <br /><br />

        <b-table
          :data="specialties"
          :columns="specialtiesColumns"
          :selected.sync="selectedSpecialty"
          bordered
          striped
        />

        <br />

        <b-button label="Suivant" type="is-primary" :disabled="!bdeInfoValid" @click="startFillingAdminInfo()" />
      </b-step-item>

      <b-step-item 
        step="3" 
        label="Admin"
        :type="state.adminInfoState"
      >
        <h1 class="title has-text-centered">Compte administrateur</h1>

        <AccountForm :specialties="specialties" @onValid="admin = $event" @onInvalid="admin = null" :showSpecialties="false" />

        <b-button
            label="Précédent"
            @click="startFillingBdeInfo()"
            :disabled="state.pending"
        />
        <b-button
            label="Créer le BDE"
            :disabled="!admin || state.pending"
            type="is-primary"
            @click="createBDE()"
        />
      </b-step-item>

      <b-step-item
        step="4"
        label="Terminé"
        :clickable="false"
        :type="state.finishState"
      >
        <h1 class="title has-text-centered">Création du BDE terminée</h1>
        <p class="has-text-centered">L'administrateur du BDE peut maintenant aller vérifier ses mails afin d'activer son compte.</p>
      </b-step-item>
    </b-steps>
  </section>
</template>
<script>
import gql from 'graphql-tag';
import SpecialtyEdit from '~/components/SpecialtyEdit.vue';

const State = {
  VERIFYING: {},
  NOT_A_BOOTSTRAP: {
    verificationState: 'is-danger',
  },
  FILL_BDE_INFO: {
    verificationState: 'is-success',
  },
  FILL_ADMIN_INFO: {
    verificationState: 'is-success',
    bdeInfoState: 'is-success',
  },
  SENDING: {
    verificationState: 'is-success',
    bdeInfoState: 'is-success',
    pending: true,
  },
  FINISHED: {
    verificationState: 'is-success',
    bdeInfoState: 'is-success',
    adminInfoState: 'is-success',
    finishState: 'is-success',
  },
  ERRORED: {
    verificationState: 'is-success',
    bdeInfoState: 'is-success',
    adminInfoState: 'is-success',
    finishState: 'is-danger',
  }
};

const GET_ALL_BDE = gql`
  {
    allBDE {
      id
    }
  }
`;

export default {
  data() {
    return {
      activeStep: 0,
      state: State.VERIFYING,
      specialties: [
        {
          index: 0,
          fullName: 'Classe préparatoire',
          shortName: 'PEIP',
          years: [1, 2],
        },
      ],
      specialtiesColumns: [
        {
          field: 'fullName',
          label: 'Nom complet',
        },
        {
          field: 'shortName',
          label: 'Acronyme',
        },
        {
          field: 'years',
          label: 'Années',
        },
      ],
      selectedSpecialty: null,
      bdeName: {
          valid: false,
          value: ''
      },
      admin: null,
    };
  },

  created() {
    this.checkIsBootstrap();
  },

  computed: {
      bdeInfoValid() {
          return this.bdeName.valid && this.specialties.length > 0;
      }
  },

  methods: {
    checkIsBootstrap() {
      this.state = State.VERIFYING;
      this.$apollo
        .query({ query: GET_ALL_BDE })
        .then(({ data }) => {
          if (data.allBDE.length > 0) {
            this.state = State.NOT_A_BOOTSTRAP;
          } else {
            this.startFillingBdeInfo();
          }
        })
        .catch(() => {
          this.state = State.NOT_A_BOOTSTRAP; // Maybe handle it differently ?
          this.$buefy.snackbar.open({
            type: 'is-danger',
            message: 'Impossible de vérifier si un BDE existe déjà.',
            actionText: 'Ré-essayer',
            position: 'is-top',
            duration: 3500,
            onAction: () => this.checkIsBootstrap(),
          });
        });
    },
    startFillingBdeInfo() {
        this.state = State.FILL_BDE_INFO;
        this.activeStep = 1;
    },
    startFillingAdminInfo() {
        this.state = State.FILL_ADMIN_INFO;
        this.activeStep = 2;
    },
    removeSelectedSpecialty() {
        const index = this.selectedSpecialty.index;
        this.selectedSpecialty = null;
        for (let i = index + 1; i < this.specialties.length; i++) {
            this.specialties[i - 1] = this.specialties[i];
            this.specialties[i - 1].index = i - 1;
        }
        this.specialties.pop();
    },
    editSelectedSpecialty() {
        this.$buefy.modal.open({
            component: SpecialtyEdit,
            active: true,
            parent: this,
            hasModalCard: true,
            trapFocus: true,
            props: {
                specialty: this.selectedSpecialty
            },
            events: {
                submitted: (newValue) => {
                    this.specialties[newValue.index].fullName = newValue.fullName;
                    this.specialties[newValue.index].shortName = newValue.shortName;
                    this.specialties[newValue.index].years = newValue.years;
                },
            }
        });
    },
    createNewSpecialty() {
        this.$buefy.modal.open({
            component: SpecialtyEdit,
            active: true,
            parent: this,
            hasModalCard: true,
            trapFocus: true,
            events: {
                submitted: (newValue) => {
                    this.specialties.push({
                        ... newValue,
                        index: this.specialties.length
                    });
                },
            }
        });
    },
    bdeNameUpdate(valid, value) {
        this.bdeName = { valid, value };
    },
    createBDE() {
      this.state = State.SENDING;
      this.$apollo.mutate({
        mutation: gql`mutation ($admin: BdeAdminDto!, $name: String!, $specialties: [SpecialtyDto!]!) {
          newBDE(admin: $admin, name: $name, specialties: $specialties) {
            id
          }
        }`,
        variables: {
          name: this.bdeName.value,
          specialties: this.specialties.map((spe) => ({
            shortName: spe.shortName,
            longName: spe.fullName,
            years: spe.years,
          })),
          admin: this.admin,
        }
      }).then(() => {
        this.state = State.FINISHED;
        this.activeStep = 3;
      }).catch(() => {
        this.$buefy.toast.open({
          message: 'Impossible de créer le BDE',
          type: 'is-danger',
        });
        this.state = State.ERRORED;
      });
    }
  },
};
</script>