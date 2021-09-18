<template>
  <section
    v-if="
      !$apollo.queries.bookableEvents.loading &&
      !$apollo.queries.bookings.loading
    "
    class="container background-gradient-dotted"
  >
    <h1 class="title is-1">Réservations</h1>
    <EventSummaryItem
      v-for="event of bookableEvents"
      :key="event.id"
      :event="event"
      :booking="bookingFor(event)"
    />
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  apollo: {
    bookableEvents: gql`
      query {
        bookableEvents {
          id
          title
          description
          bookingStart
          bookingEnd
          totalSchoolPlacesCount
          bookedSchoolPlacesCount
          totalExternPlacesCount
          bookedExternPlacesCount
          isMemberOnly
        }
      }
    `,
    bookings: gql`
      query {
        bookings {
          id
        }
      }
    `,
  },
  computed: {
    bookingsDict() {
      if (this.$apollo.queries.bookings.loading) {
        return {};
      }
      return this.bookings
        .map((booking) => ({
          [atob(booking.id).split(':')[0]]: booking,
        }))
        .reduce((merge, next) => Object.assign(merge, next), {});
    },
  },
  methods: {
    bookingFor(event) {
      return this.bookingsDict[event.id];
    },
  },
};
</script>