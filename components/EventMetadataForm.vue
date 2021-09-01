<template>
  <form action="">
    <InputField
      id="eventName"
      type="text"
      label="Nom de l'événement"
      @update="onTitleUpdate"
      required
      :validator="titleValidator"
    />
    <InputField
      id="eventDescription"
      type="textarea"
      label="Description"
      @update="onDescriptionUpdate"
    />
    <b-field label="Début des réservations">
      <b-datetimepicker
        v-model="bookingStart"
        placeholder="Cliquer pour définir"
        icon="calendar-today"
        :icon-right="bookingStart ? 'close-circle' : ''"
        icon-right-clickable
        @icon-right-click="clearBookingStart"
        horizontal-time-picker
        :min-datetime="now"
        :max-datetime="bookingEnd"
      />
    </b-field>
    <b-field label="Fin des réservations">
      <b-datetimepicker
        v-model="bookingEnd"
        placeholder="Cliquer pour définir"
        icon="calendar-today"
        :icon-right="bookingEnd ? 'close-circle' : ''"
        icon-right-clickable
        @icon-right-click="clearBookingEnd"
        horizontal-time-picker
        :min-datetime="bookingStart || now"
      />
    </b-field>
  </form>
</template>

<script>
import { eventNameValidation } from '~/plugins/validators';

export default {
  data() {
    return {
      title: { valid: false, value: '' },
      description: '',
      bookingStart: null,
      bookingEnd: null,
      now: new Date(),
    };
  },
  emits: ['onValid', 'onInvalid'],
  computed: {
    titleValidator() {
      return eventNameValidation;
    },
    formValue() {
      return {
        title: this.title.value,
        description: this.description,
        bookingStart: this.bookingStart,
        bookingEnd: this.bookingEnd,
      };
    },
  },
  watch: {
    title: function () {
      this.checkValidity();
    },
  },
  methods: {
    onTitleUpdate(valid, value) {
      this.title = { valid, value };
    },
    onDescriptionUpdate(_, value) {
      this.description = value;
    },
    checkValidity() {
      if (this.title.valid) {
        this.$emit('onValid', this.formValue);
      } else {
        this.$emit('onInvalid');
      }
    },
    clearBookingStart() {
      this.bookingStart = null;
    },
    clearBookingEnd() {
      this.bookingEnd = null;
    },
  },
};
</script>

<style>
</style>