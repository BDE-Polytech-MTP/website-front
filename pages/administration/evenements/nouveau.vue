<template>
  <section class="container">
    <article class="section">
      <div class="column is-8 is-offset-2">
        <b-steps v-model="activeStep" :has-navigation="false">
          <b-step-item
            step="1"
            label="Présentation"
            :clickable="!!eventPresentation"
          >
            <h1 class="title has-text-centered mt-6">
              Présentation de l'événement
            </h1>
            <EventMetadataForm
              @onValid="eventPresentation = $event"
              @onInvalid="eventPresentation = null"
            />
            <b-button
              class="mt-5"
              label="Suivant"
              type="is-primary is-pulled-right"
              :disabled="!eventPresentation"
              @click="next()"
            />
          </b-step-item>
          <b-step-item step="2" label="Places" :clickable="!!eventPresentation">
            <h1 class="title has-text-centered mt-6">
              Nombre de places à l'événement
            </h1>
            <EventPlacesForm @onValid="eventPlaces = $event" />
            <div class="buttons mt-5 is-pulled-right">
              <b-button label="Retour" @click="previous()" />
              <b-button
                type="is-primary is-pulled-right"
                label="Suivant"
                :disabled="eventPlaces === null"
                @click="next()"
              />
            </div>
          </b-step-item>
          <b-step-item
            step="3"
            label="Questionnaires"
            :clickable="!!eventPresentation && !!eventPlaces"
          >
            <h1 class="title has-text-centered mt-6">
              Informations relatives à une réservation
            </h1>
            <EventSurveysForm
              @onInvalid="eventSurveys = null"
              @onValid="eventSurveys = $event"
            />
            <div class="buttons mt-5 is-pulled-right">
              <b-button label="Retour" @click="previous()" />
              <b-button
                type="is-primary is-pulled-right"
                label="Créer l'événement"
                :disabled="eventSurveys === null"
                @click="createEvent()"
              />
            </div>
          </b-step-item>
        </b-steps>
      </div>
    </article>
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  data() {
    return {
      activeStep: 0,
      eventPresentation: null,
      eventPlaces: null,
      eventSurveys: null,
    };
  },
  methods: {
    next() {
      this.activeStep = this.activeStep + 1;
    },
    previous() {
      this.activeStep = this.activeStep - 1;
    },
    createEvent() {
      if (!this.eventPresentation || !this.eventPlaces || !this.eventSurveys) {
        this.$buefy.toast.open({
          message: "Il nous manque des informations pour créer l'événement",
          type: 'is-warning',
        });
      } else {
        this.$buefy.dialog.confirm({
          message: "Vous êtes sur le point de créer l'événement. Continuer ?",
          cancelText: "Non, je n'ai pas terminé",
          confirmText: "Oui, je crée l'événement",
          type: 'is-info',
          hasIcon: true,
          onConfirm: () => {
            this.$apollo
              .mutate({
                mutation: gql`
                  mutation CreateEventMutation($event: EventSpec!) {
                    createEvent(event: $event) {
                      id
                    }
                  }
                `,
                variables: {
                  event: {
                    title: this.eventPresentation.title,
                    description: this.eventPresentation.description,
                    bookingStart: this.eventPresentation.bookingStart,
                    bookingEnd: this.eventPresentation.bookingEnd,
                    limitedToMembers: this.eventPlaces.membersOnly,
                    places: this.eventPlaces.places.map((placeSpec) => ({
                      bde: placeSpec.id,
                      forSchool: placeSpec.school,
                      forExterns: placeSpec.extern,
                    })),
                    surveys: this.eventSurveys.map((surveySpec) => ({
                      title: surveySpec.title,
                      description: surveySpec.description || '',
                      limitedToMembers: surveySpec.membersOnly,
                      required: surveySpec.required,
                      adminRestricted: !surveySpec.userEditable,
                      choices: surveySpec.choices.map((choice) => ({
                        name: choice.title,
                        max: choice.limit,
                      })),
                    })),
                  },
                },
              })
              .then(() =>
                this.$buefy.toast.open({
                  message: "L'événement a été créé",
                  type: 'is-success',
                }),
              )
              .catch(() =>
                this.$buefy.toast.open({
                  message: "Impossible de créer l'événement",
                  type: 'is-danger',
                }),
              );
          },
        });
      }
    },
  },
};
</script>