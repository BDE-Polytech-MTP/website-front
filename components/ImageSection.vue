<template>
  <section class="container">
    <article class="section is-medium">
      <figure class="image">
        <img :src="require(`~/assets/img/${src}`)" />
      </figure>
    </article>
  </section>
</template>


<script>
export default {
  name: "ImageSection",
  props: {
    src: { type: String, required: true },
  },
};
</script>