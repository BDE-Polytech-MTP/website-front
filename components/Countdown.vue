<template>
  <section class="container is-unselectable">
    <article class="section is-medium">
      <div class="mb-6 column is-8 is-offset-2">
        <h1 class="title is-1 has-text-centered mb-6">{{ title }}</h1>
        <p class="subtitle has-text-centered">
          {{ subtitle }}
        </p>
      </div>
      <div class="is-flex is-align-items-center is-justify-content-center">
        <div :class="'card p-3 ' + synchronized" v-if="!finish">
          <div class="card-content has-text-centered">
            <div class="columns">
              <div class="column is-narrow px-4">
                <p class="title is-1 mb-1">{{ days }}</p>
                <p class="is-family-code mt-0 pt-0">jours</p>
              </div>
              <div class="column is-narrow px-4 is-hidden-touch">
                <p class="title is-1 has-text-weight-medium">:</p>
              </div>
              <div class="column is-narrow px-4">
                <p class="title is-1 mb-1">{{ hours }}</p>
                <p class="is-family-code mt-0 pt-0">heures</p>
              </div>
              <div class="column is-narrow px-4 is-hidden-touch">
                <p class="title is-1 has-text-weight-medium">:</p>
              </div>
              <div class="column is-narrow px-4">
                <p class="title is-1 mb-1">{{ minutes }}</p>
                <p class="is-family-code mt-0 pt-0">minutes</p>
              </div>
              <div class="column is-narrow px-4 is-hidden-touch">
                <p class="title is-1 has-text-weight-medium">:</p>
              </div>
              <div class="column is-narrow px-4">
                <p class="title is-1 mb-1">{{ seconds }}</p>
                <p class="is-family-code mt-0 pt-0">secondes</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <slot></slot>
        </div>
      </div>
    </article>
  </section>
</template>

<script>
export default {
  props: {
    to: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
  },
  data() {
    return {
      date:
        new Date(this.to).getTime() +
        new Date(this.to).getTimezoneOffset() * 60 * 1000,
      days: "-",
      hours: "-",
      minutes: "-",
      seconds: "-",
      finish: false,
      synchronized: "",
    };
  },
  mounted() {
    if (this.date - new Date().getTime() < 0) {
      this.finish = true;
    } else {
      let gap = 0;
      const it = setInterval(() => {
        gap = this.date - new Date().getTime();
        if (gap < 0) {
          this.finish = true;
          this.synchronized = "";
          this.$emit("finish", true);
          clearInterval(it);
        } else {
          const s = 1000;
          const m = s * 60;
          const h = m * 60;
          const d = h * 24;
          const days = "" + Math.floor(gap / d);
          const hours = Math.floor((gap % d) / h);
          const minutes = Math.floor((gap % h) / m);
          const seconds = Math.floor((gap % m) / s);
          this.synchronized == "" && (this.synchronized = "beat");
          this.days = days < 10 ? "0" + days : days;
          this.hours = hours < 10 ? "0" + hours : hours;
          this.minutes = minutes < 10 ? "0" + minutes : minutes;
          this.seconds = seconds < 10 ? "0" + seconds : seconds;
        }
      }, 1000);
    }
  },
};
</script>

<style lang="css" scoped>
.beat {
  animation: beating 1s infinite;
}

@keyframes beating {
  0% {
    box-shadow: 0 0.5em 1em -0.125em rgba(0, 0, 0, 0.1),
      0 0px 0 1px rgba(0, 0, 0, 0.02);
  }
  50% {
    box-shadow: 1em 2.5em 2.5em -2.125em rgba(0, 0, 0, 0.1),
      10px 10px 10px 10px rgba(0, 0, 0, 0.02);
  }
}
</style>