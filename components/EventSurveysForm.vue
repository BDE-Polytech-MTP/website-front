<template>
  <div>
    <div v-for="survey of surveys" :key="survey.id" class="card my-2">
      <header
        class="card-header"
        style="cursor: pointer"
        @click="onTriggerExpand(survey.id)"
      >
        <div v-if="editing.id === survey.id" class="card-header-title">
          <b-input
            v-model="editing.title"
            placeholder="Titre"
            @click.native="$event.stopPropagation()"
          />
        </div>
        <div v-else class="card-header-title">
          {{ survey.title }}
        </div>
        <button class="card-header-icon" aria-label="expand">
          <b-icon
            :icon="expanded[survey.id] ? 'chevron-down' : 'chevron-right'"
            size="is-small"
          />
        </button>
      </header>
      <div :class="`expandable ${expanded[survey.id] ? 'expanded' : ''}`">
        <div class="card-content">
          <div v-if="editing.id === survey.id" class="content">
            <b-field>
              <b-checkbox v-model="editing.membersOnly"
                >Adhérents seulement</b-checkbox
              >
              <b-tooltip
                label="Indique que ce questionnaire ne concerne que les adhérents"
                position="is-right"
              >
                <b-icon icon="information-outline" size="is-small" />
              </b-tooltip>
            </b-field>
            <b-field>
              <b-checkbox
                v-model="editing.userEditable"
                :false-value="true"
                :true-value="false"
                >Renseigné par le BDE</b-checkbox
              >
              <b-tooltip
                label="Seul le BDE pourra définir l'option choisie"
                position="is-right"
              >
                <b-icon icon="information-outline" size="is-small" />
              </b-tooltip>
            </b-field>
            <b-field>
              <b-checkbox v-model="editing.required"
                >Réponse requise</b-checkbox
              >
              <b-tooltip
                label="La réservation ne sera pas validée si aucune option n'est choisie"
                position="is-right"
              >
                <b-icon icon="information-outline" size="is-small" />
              </b-tooltip>
            </b-field>
          </div>
          <p v-else class="content">
            <span v-if="survey.membersOnly" class="tag ml-2 is-info">
              Adhérents seulement
            </span>
            <span v-if="!survey.userEditable" class="tag ml-2 is-warning">
              Renseigné par le BDE
            </span>
            <span v-if="survey.required" class="tag ml-2 is-danger">
              Réponse requise
            </span>
          </p>
          <p v-if="editing.id === survey.id" class="content">
            <b-input
              placeholder="Description"
              v-model="editing.description"
              type="textarea"
            />
          </p>
          <p v-else-if="survey.description" class="content">
            {{ survey.description }}
          </p>
          <div v-if="editing.id === survey.id" class="buttons">
            <b-button
              class="is-primary is-small"
              label="Ajouter une option"
              @click="addNewChoice"
            />
            <b-button
              class="is-danger is-small"
              :disabled="checkedRows.length === 0"
              :label="`Supprimer ${checkedRows.length} option${
                checkedRows.length > 1 ? 's' : ''
              }`"
              @click="deleteSelectedChoices"
            />
          </div>
          <p>
            <b-table
              :data="
                editing.id === survey.id ? editing.choices : survey.choices
              "
              :checkable="editing.id === survey.id"
              checkbox-position="left"
              :checked-rows.sync="checkedRows"
            >
              <b-table-column
                v-if="editing.id === survey.id"
                field="title"
                label="Nom de l'option"
                v-slot="props"
              >
                <b-input
                  :key="'title-' + props.row.id"
                  type="text"
                  v-model="props.row.title"
                />
              </b-table-column>
              <b-table-column
                v-else
                field="title"
                label="Nom de l'option"
                v-slot="props"
              >
                {{ props.row.title }}
              </b-table-column>
              <b-table-column field="limit">
                <template #header
                  >Nombre
                  <b-tooltip
                    label="Nombre d'utilisateurs pouvant opter pour l'option"
                    position="is-left"
                  >
                    <b-icon
                      icon="information-outline"
                      size="is-small"
                    /> </b-tooltip
                ></template>
                <template v-if="editing.id === survey.id" v-slot="props">
                  <span
                    class="tag clickable"
                    @click="editLimit(props.row.id, props.row.limit)"
                    :key="'limit-' + props.row.id"
                    >{{ computeDisplayedTextFromCount(props.row.limit) }} 🖊️
                  </span>
                </template>
                <template v-else v-slot="props">
                  {{ computeDisplayedTextFromCount(props.row.limit) }}
                </template>
              </b-table-column>

              <template #empty>
                <div class="has-text-centered has-text-grey">Pas d'options</div>
              </template>
            </b-table>
          </p>
        </div>
        <footer v-if="editing.id === survey.id" class="card-footer">
          <b-button
            class="card-footer-item squared"
            label="Annuler"
            @click="cancelEdition()"
          />
          <b-button
            class="card-footer-item squared is-success"
            label="Valider"
            :disabled="!canValidateEdition"
            @click="validateEdition()"
          />
        </footer>
        <footer v-else class="card-footer">
          <b-button
            class="card-footer-item squared"
            label="Modifier"
            :disabled="editing.id !== -1"
            @click="editSurvey(survey.id)"
          />
          <b-button
            class="card-footer-item is-danger squared"
            :rounded="false"
            @click="deleteSurvey(survey.id)"
            label="Supprimer"
          />
        </footer>
      </div>
    </div>

    <b-button
      label="Ajouter"
      type="is-primary"
      :disabled="editing.id !== -1"
      @click="addSurvey"
    />
    <div v-if="surveys.length === 0" class="has-text-centered has-text-grey">
      Pas encore de questionnaires définis pour cet événements
    </div>
  </div>
</template>

<script>
import EditCountModal from './EditCountModal.vue';

export default {
  data() {
    const surveys = [
      {
        id: this.newUUID(),
        title: 'Bus',
        required: true,
        userEditable: true,
        membersOnly: false,
        description: "Choisissez le bus vous menant à l'événement.",
        choices: [
          {
            id: this.newUUID(),
            title: 'Bus 1',
            limit: 40,
          },
          {
            id: this.newUUID(),
            title: 'Bus 2',
            limit: 40,
          },
          {
            id: this.newUUID(),
            title: 'Bus 3',
            limit: 40,
          },
          {
            id: this.newUUID(),
            title: 'Bus 4',
            limit: 40,
          },
        ],
      },
      {
        id: this.newUUID(),
        title: 'Payé',
        required: true,
        userEditable: false,
        membersOnly: false,
        choices: [
          {
            id: this.newUUID(),
            title: 'Oui',
            limit: -1,
          },
          {
            id: this.newUUID(),
            title: 'Non',
            limit: -1,
          },
        ],
      },
    ];
    this.$emit('onValid', surveys);
    return {
      editing: {
        id: -1,
      },
      checkedRows: [],
      expanded: {},
      surveys,
    };
  },
  methods: {
    onTriggerExpand(id) {
      if (this.expanded[id]) {
        this.expanded = {
          ...this.expanded,
          [id]: false,
        };
      } else {
        this.expanded = {
          ...this.expanded,
          [id]: true,
        };
      }
    },
    editSurvey(id) {
      this.$emit('onInvalid');
      this.editing = {
        ...this.surveys.find((survey) => survey.id === id),
      };
    },
    cancelEdition() {
      const index = this.surveys.findIndex(
        (survey) => survey.id === this.editing.id,
      );
      const survey = this.surveys[index];
      this.checkedRows = [];
      if (survey.choices.length === 0) {
        this.surveys.splice(index, 1);
      }
      this.editing = {
        id: -1,
      };
    },
    validateEdition() {
      const newSurveyValue = this.editing;
      const index = this.surveys.findIndex(
        (survey) => survey.id === this.editing.id,
      );
      this.surveys = this.surveys
        .slice(0, index)
        .concat([newSurveyValue])
        .concat(this.surveys.slice(index + 1));
      this.cancelEdition();
    },
    addSurvey() {
      const newSurvey = {
        id: this.newUUID(),
        title: '',
        required: false,
        userEditable: true,
        membersOnly: false,
        choices: [],
      };
      this.surveys.push(newSurvey);
      this.onTriggerExpand(newSurvey.id);
      this.editSurvey(newSurvey.id);
    },
    computeDisplayedTextFromCount(count) {
      if (count < 0) {
        return 'Illimité';
      }
      return count;
    },
    newUUID() {
      return btoa(new Date().toISOString() + Math.random());
    },
    deleteSelectedChoices() {
      const toDelete = this.checkedRows.splice(0).map((row) => row.id);
      this.editing = {
        ...this.editing,
        choices: this.editing.choices.filter(
          (choice) => !toDelete.includes(choice.id),
        ),
      };
    },
    addNewChoice() {
      this.editing = {
        ...this.editing,
        choices: this.editing.choices.concat([
          {
            id: this.newUUID(),
            title: '',
            limit: -1,
          },
        ]),
      };
    },
    editLimit(id, currentValue) {
      this.$buefy.modal.open({
        component: EditCountModal,
        active: true,
        parent: this,
        hasModalCard: true,
        trapFocus: true,
        props: {
          currentValue: currentValue,
          numberWordPrefix: "d'utilisateurs",
        },
        events: {
          onSubmit: (newValue) => {
            this.editing.choices.find((choice) => choice.id === id).limit =
              newValue;
          },
        },
      });
    },
    deleteSurvey(id) {
      this.$buefy.dialog.confirm({
        message:
          'Êtes-vous sur de vouloir supprimer ce questionnaire ? Cette action est irréversible.',
        cancelText: 'Annuler',
        confirmText: 'Supprimer le questionnaire',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => {
          this.surveys = this.surveys.filter((survey) => survey.id !== id);
          this.$buefy.toast.open({
            type: 'is-danger',
            message: 'Questionnaire supprimé',
          });
        },
      });
    },
  },
  computed: {
    canValidateEdition() {
      if (this.editing.id === -1) return false;
      const titleValid =
        this.editing.title.trim().length > 0 &&
        this.editing.title.trim().length <= 40;
      const choicesValid =
        this.editing.choices.filter(
          (choice) =>
            choice.title.trim().length === 0 || choice.title.trim().length > 40,
        ).length === 0;
      return titleValid && choicesValid;
    },
  },
  watch: {
    surveys() {
      if (this.editing.id === -1) {
        this.$emit('onValid', this.surveys);
      }
    },
  },
};
</script>

<style scoped>
.squared {
  border-radius: 0;
}
.expandable {
  height: 0;
  transition: height 1s;
  overflow-y: hidden;
}
.expanded {
  height: auto;
}
.clickable:hover {
  cursor: pointer;
}
</style>