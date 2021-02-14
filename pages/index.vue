<template>
  <section>
    <Parallax
      src="header.jpg"
      title="Fraternitech"
      :topPercentage="10"
      :active="true"
      size="fullscreen"
      scrollTo="testID"
    />
    <Article
      title="Polytech Montpellier"
      subtitle="Associations d'élèves"
      :contents="contents"
      startWithImage
      picture="mock.jpg"
      id="testID"
    />
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
        { titre: "Prix compétitif", valeur: "50€" },
        { titre: "semaines", valeur: 34 },
        { titre: "étudiants", valeur: 561 },
        { titre: "professeurs", valeur: 192 },
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