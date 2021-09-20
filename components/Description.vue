<template>
  <article>
    <section class="container">
      <div class="blockquote">
        <p class="info has-text-centered">Infos</p>
        <p v-for="quote in quotes" :key="quote"  class="has-text-centered">
          {{ quote }}
        </p>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  props: {
    quotes: {Type: Array, required: true}
  },
};
</script>

<style>
.container {
  margin-top: 5rem;
  margin-bottom: 5rem;
}
.info {
  font-weight: bold;
  font-size: 40px;
}
.blockquote {
  padding: 60px;
  background-color: white;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  font-family: "Georgia Pro";
  font-style: inherit;
  font-size: 20px;
}

</style>
