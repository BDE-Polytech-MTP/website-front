<template>
  <section>
    <div id="header">
      <h1 id="header-title" class="title has-text-white">Fraternitech</h1>
    </div>
    <p class="has-text-centered has-text-primary mt-3">
      <b-icon icon="chevron-down" size="is-large" />
    </p>
    <Article
      title="Badminton"
      subtitle="Associations sportives"
      :contents="contents"
      stsartWithImage
      picture="bde-org.png"
    >
      <ul>
        <li class="subtitle is-size-6 my-2">🕒 : <strong>18h-22h</strong></li>
        <li class="subtitle is-size-6 my-2">
          📌 : <strong>4 rue emile Madelong</strong>
        </li>
        <li class="subtitle is-size-6 my-2">
          📣 : <strong>Axel Duval</strong>
        </li>
      </ul>
    </Article>

    <Numbers :content="numbers" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      contents: [
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex temporibus voluptatem sunt fuga et. Et saepe eius facilis nam officia? Impedit       consequuntur commodi beatae ipsum eveniet neque voluptatum nisi        suscipit!",
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex temporibus voluptatem sunt fuga et. Et saepe eius facilis nam officia? Impedit        consequuntur commodi beatae ipsum eveniet neque voluptatum nisi        suscipit!",
      ],
      numbers: [
        { title: "Prix compétitif", number: "50€" },
        { title: "étudiants", number: 561 },
        { title: "professeurs", number: 192 },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
#header {
  width: 100%;
  height: 70vh;
  background-position: 50% 50%;
  background-size: cover;
  background-image: url("~assets/img/header.jpg");
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  user-select: none;
}

#header-title {
  background-image: linear-gradient(#00a5e2, #00a5e2);
  background-size: 0;
  background-repeat: no-repeat;
  display: inline;
  transition: 0.6s ease;
  font-size: 9rem;
}

#header-title:hover {
  background-size: 100%;
}

@media screen and (min-width: 1216px) and (max-width: 1407px) {
  #header-title {
    font-size: 7.5em;
  }
  #header {
    height: 65vh;
  }
}

@media screen and (min-width: 1024px) and (max-width: 1215px) {
  #header-title {
    font-size: 6rem;
  }
  #header {
    height: 60vh;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  #header-title {
    font-size: 4.5rem;
  }
  #header {
    height: 55vh;
  }
}

@media screen and (max-width: 768px) {
  #header-title {
    font-size: 3rem;
  }
  #header {
    height: 50vh;
  }
}
</style>