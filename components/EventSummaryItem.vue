<template>
  <div class="card m-3">
    <header class="card-header">
      <p class="card-header-title">
        {{ event.title }}
      </p>
      <p class="card-header-icon">
        {{ bookingsCountDisplayText }}
      </p>
    </header>
    <div class="card-content">
      <div class="content">
        <b-tag v-if="bookingState === 'bookable'" type="is-info"
          >Réservations ouvertes !
        </b-tag>
        <b-tag v-if="bookingState === 'ended'" type="is-danger"
          >Réservations terminées
        </b-tag>
        <b-tag v-if="bookingState === 'not-started'" type="is-info is-light"
          >Les réservations démarrent {{ formatDate(event.bookingStart) }}
        </b-tag>
        <b-tag v-if="bookingState === 'full'" type="is-danger is-light"
          >Il ne reste plus de places
        </b-tag>
        <b-tag v-if="shouldDisplayEndDate" type="is-warning"
          >Les réservations s'arrêtent {{ formatDate(event.bookingEnd) }}
        </b-tag>
        <p v-if="event.description.length">
          {{ event.description }}
        </p>
        <div class="is-flex is-flex-direction-row is-justify-content-end">
          <b-button
            type="card-footer-item is-primary is-flex-grow-0"
            label="Réserver ma place >"
            :disabled="bookingState !== 'bookable'"
            @click="bookEvent"
            v-if="!booking"
          />
          <NuxtLink v-else :to="`/reservations/${event.id}`">
            <b-button
              type="card-footer-item is-success is-flex-grow-0"
              label="Ma réservation >"
            />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
dayjs.extend(relativeTime);
dayjs.locale('fr');

export default {
  props: {
    event: { required: true },
    booking: { required: false },
  },
  data() {
    return {
      now: new Date(),
      timer: 0,
    };
  },
  created() {
    this.timer = window.setInterval(() => (this.now = new Date()), 1000);
  },
  destroyed() {
    window.clearInterval(this.timer);
  },
  computed: {
    bookedCount() {
      if (this.$auth.user.isExtern) {
        return this.event.bookedExternPlacesCount;
      }
      return this.event.bookedSchoolPlacesCount;
    },
    bookableCount() {
      if (this.$auth.user.isExtern) {
        return this.event.totalExternPlacesCount;
      }
      return this.event.totalSchoolPlacesCount;
    },
    bookingState() {
      // If not bookingStart nor bookingEnd
      if (!this.event.bookingStart && !this.event.bookingEnd) {
        return 'bookable';
      }
      // If now is after bookingEnd
      if (this.event.bookingEnd && new Date(this.event.bookingEnd) < this.now) {
        return 'ended';
      }
      // If now is before bookingStart
      if (
        this.event.bookingStart &&
        new Date(this.event.bookingStart) > this.now
      ) {
        return 'not-started';
      }

      //////////////////////////////////////////////////////////////////
      // Here we are between bookingStart and bookingEnd (if defined) //
      //////////////////////////////////////////////////////////////////

      if (
        this.bookableCount !== null &&
        this.bookedCount >= this.bookableCount
      ) {
        return 'full';
      }

      return 'bookable';
    },
    shouldDisplayEndDate() {
      return this.bookingState === 'bookable' && this.event.bookingEnd;
    },
    bookingsCountDisplayText() {
      return this.bookableCount === null
        ? 'Réservations illimitées'
        : `${this.bookedCount} réservation${
            this.bookedCount > 1 ? 's' : ''
          } sur ${this.bookableCount}`;
    },
  },
  methods: {
    formatDate(date) {
      return dayjs(date).from(this.now);
    },
    bookEvent() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation ($eventId: String!) {
              book(eventId: $eventId) {
                id
              }
            }
          `,
          variables: {
            eventId: this.event.id,
          },
        })
        .then((result) => {
          const [eventId] = atob(result.data.book.id).split(':');
          this.$router.push(`/reservations/${eventId}`);
        })
        .catch(() => {
          this.$buefy.toast.open({
            message:
              'Il ne reste malheureusement plus de places pour cet événement',
            type: 'is-danger',
          });
        });
    },
  },
};
</script>

<style>
</style>