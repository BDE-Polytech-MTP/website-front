<template>
  <section class="background-gradient">
    <Parallax
      class="background-gradient-lines"
      src="header.jpg"
      title="Montpellier"
      :topPercentage="10"
      :active="false"
      size="fullscreen"
      scrollTo="testID"
    />

    <div class="background-gradient-lines">
      <Countdown
        to="2021-02-21T21:31:00Z"
        title="Ouverture billeterie"
        subtitle="Prépares ta carte bleue et ta calculatrice, tu me remercieras plus
          tard..."
      >
        <b-button type="is-primary">Prendre ma place</b-button>
        <b-button>Retour</b-button>
      </Countdown>
      <Article
        title="Polytech Montpellier"
        subtitle="Associations d'élèves"
        :contents="contents"
        startWithImage
        picture="mock.jpg"
        id="testID"
      />
    </div>

    <Assets
      :assets="[
        'Unlimited tasks',
        'SMS Task Reminders',
        'Confetti Explosions upon Task Completions',
        'Social Media announcements',
        'Real time Collaboration',
        'Other Awesome features',
      ]"
      picture="people.jpg"
    />
    <div class="background-gradient-lines">
      <Features
        title="Le weekend parfait"
        subtitle="Aller c'est parti, suis nous le temps d'un weekend sur la cote Atlantique"
        :features="features"
      />
      <Numbers :content="numbers" />
    </div>
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
      features: [
        {
          titre: "Du beau temps",
          description: "C'est promis il fera beau tout le weekend",
          emoji: "⛅",
        },
        {
          titre: "Dans la nature",
          description: "Tu ne sera pas déçu de l'emplacement",
          emoji: "🌿",
        },
        {
          titre: "De la bière",
          description: "Ce doux breuvage subtil sera distribué à volonté",
          emoji: "🍺",
        },
        {
          titre: "Des vagues",
          description: "T'es même pas prêt pour ces vagues de dingue !",
          emoji: "🌊",
        },
      ],
    };
  },
};
</script>

<style lang="css">
</style>