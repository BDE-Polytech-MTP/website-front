<!-- Introduction of a member -->
<template>
  <div class="card large">
    <div class="card-image">

      <figure class="image is-square">
        <img
          :src="getImgUrl(picture)"
          :alt="'Photo de ' + firstName + ' ' + lastName" />
      </figure>

    </div>

    <div class="card-content">

      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img :src="require('../assets/img/fil/' + education + '.png')" :alt="education">
          </figure>
        </div>

        <div class="media-content">
          <p class="title is-4 no-padding">
            {{ firstName }} {{ lastName }}
          </p>

          <p>
            <span class="title is-6">
              <a
                :href="'mailto:' + mail"
                class = "button is-info is-light has-text-dark"
              >
                <i class="fas fa-at" />
                {{ mail }}
              </a>
            </span>
          </p>

          <p class="subtitle is-6">
            {{ place }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Member",
  props: {
    picture: { type: String, required: false, default: "member" },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mail: { type: String, required: false },
    place: { type: String, required: true },
    education: { type: String, required: true },
  },
  methods: {
    getImgUrl(name) {
      return "/_nuxt/assets/img/members/" + name + ".jpg";
    }
  }
};
</script>

<style scoped>
  figure.is-square {
    background: grey;
  }
  figure.is-square img {
    opacity: 1;
    -webkit-transition: .3s ease-in-out;
    transition: .3s ease-in-out;
  }
  figure.is-square:hover img {
    opacity: .5;
  }
</style>
