<template>
  <article>
    <section class="container">
      <div class="blockquote">
        <p class="has-text-centered">
          {{ quote }}
        </p>
      </div>
    </section>
  </article>
</template>

<script>

export default {
  props: {
    quote: {Type: String, required: true}
  },
};
</script>

<style>

.blockquote {
  padding: 60px;
  background-color: white;
  border-bottom: 1px solid rgb(0,156,221);
  border-top: 1px solid rgb(0,156,221);
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  font-family: "Georgia Pro";
  font-style: inherit;
  font-size: 20px;
}

</style>
