<template>
  <section>
    <Article
      title="Adhésions"
      subtitle="Rejoins nous!"
      :contents="[
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed orci non erat sagittis vehicula. Nullam venenatis ornare arcu, at dignissim lectus mollis et. Sed in venenatis eros, sed tincidunt purus. Curabitur at ex quis turpis consequat rutrum. Duis at risus eu sapien tincidunt dignissim. Curabitur nec venenatis libero. Sed vulputate augue vel orci luctus aliquet. Aliquam nec volutpat leo, ac dapibus neque. Donec magna augue, accumsan in egestas ullamcorper, placerat ut arcu. Sed sollicitudin scelerisque tristique.',
      ]"
      picture="organigram.jpg"
    />
    <Features
      :features="features"
      title="Titre"
      subtitle="Petite description"
    />
  </section>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          titre: "Sécurisé",
          description:
            "Tes données sont bien gardées et ne seront jamais vendues",
          emoji: "🔒",
        },
        {
          titre: "Transparent",
          description: "Les comptes sont publiés, pas d'inquiétude !",
          emoji: "🔍",
        },
        {
          titre: "Majorité",
          description:
            "Les évènements ou il y a de l'alcool sont interdits aux mineurs",
          emoji: "🔞",
        },
      ],
    };
  },
};
</script>