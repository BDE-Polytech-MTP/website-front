<template>
  <section class="hero is-primary is-bold is-medium">
    <div class="background-gradient-dotted">
      <div class="hero-body background-linear-assets">
        <div class="container">
          <div class="columns">
            <div
              class="column is-full is-three-fifths-desktop is-flex is-justify-content-center is-align-items-center"
            >
              <ul class="assets">
                <li class="subtitle" v-for="asset in assets" v-bind:key="asset">
                  {{ asset }}
                </li>
              </ul>
            </div>
            <div
              class="column is-hidden-touch p-0 is-flex is-align-items-center"
            >
              <figure class="image grayscale">
                <img :src="require(`~/assets/img/${picture}`)" class="img-br" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    assets: { type: Array, required: true },
    picture: { type: String, required: true },
  },
};
</script>

<style lang="css" scoped>
.background-linear-assets {
  background-image: linear-gradient(
      16deg,
      rgba(116, 116, 116, 0.02) 0%,
      rgba(116, 116, 116, 0.02) 25%,
      transparent 25%,
      transparent 96%,
      rgba(177, 177, 177, 0.02) 96%,
      rgba(177, 177, 177, 0.02) 100%
    ),
    linear-gradient(
      236deg,
      rgba(148, 148, 148, 0.02) 0%,
      rgba(148, 148, 148, 0.02) 53%,
      transparent 53%,
      transparent 59%,
      rgba(56, 56, 56, 0.02) 59%,
      rgba(56, 56, 56, 0.02) 100%
    ),
    linear-gradient(
      284deg,
      rgba(16, 16, 16, 0.02) 0%,
      rgba(16, 16, 16, 0.02) 46%,
      transparent 46%,
      transparent 71%,
      rgba(181, 181, 181, 0.02) 71%,
      rgba(181, 181, 181, 0.02) 100%
    ),
    linear-gradient(
      316deg,
      rgba(197, 197, 197, 0.02) 0%,
      rgba(197, 197, 197, 0.02) 26%,
      transparent 26%,
      transparent 49%,
      rgba(58, 58, 58, 0.02) 49%,
      rgba(58, 58, 58, 0.02) 100%
    );
}
.assets li {
  margin-left: 1.7rem;
  padding: 0.3rem;
  position: relative;
}
.assets li::before {
  content: "";
  position: absolute;
  left: -2.5rem;
  background-image: url("~assets/img/bullet.svg");
  background-size: contain;
  width: 25px;
  height: 25px;
  margin-right: 0.5rem;
}
.assets li:hover::before {
  transform: scale(1.2) translateX(6px);
}
.assets li::before {
  transition: 0.2s;
}
</style>