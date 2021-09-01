<template>
  <div>
    <div v-for="(component, index) in components" v-bind:key="index">
      <Parallax
        v-if="typeOf(component) == 'parallax'"
        :id="component.parallax.id"
        :src="component.parallax.picture"
        :title="component.parallax.title"
        :topPercentage="component.parallax.topPercentage"
        :active="component.parallax.active"
        :size="component.parallax.size"
        :scrollTo="component.parallax.scrollTo"
      />
      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'article'"
      >
        <Article
          :id="component.article.id"
          :title="component.article.title"
          :subtitle="component.article.subtitle"
          :contents="component.article.contents"
          :startWithImage="component.article.pictureFirst"
          :picture="component.article.picture"
        />
      </div>

      <Assets
        v-else-if="typeOf(component) == 'assets'"
        :id="component.assets.id"
        :assets="component.assets.data"
        :picture="component.assets.picture"
      />

      <TimeLocation
        v-else-if="typeOf(component) == 'timelocation'"
        :id="component.timeLocation.id"
        :time="component.timeLocation.time"
        :location="component.timeLocation.location"
      />

      <Members
        v-else-if="typeOf(component) == 'members'"
        :title="component.members.title"
        :subtitle="component.members.subtitle"
        :map="component.members.gmap"
        :members="component.members.members"
      />

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'picture'"
      >
        <ImageSection
          :id="component.picture.id"
          :src="component.picture.picture"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'numbers'"
      >
        <Numbers
          :id="component.numbers.id"
          :content="component.numbers.data"
          :theme="component.numbers.theme"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'features'"
      >
        <Features
          :id="component.features.id"
          :title="component.features.title"
          :subtitle="component.features.subtitle"
          :features="component.features.data"
        />
      </div>
      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'clubs'"
      >
        <Clubs
          :clubs="component.clubs.clubs"
          :color="component.clubs.color"
        />
      </div>
      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'description'"
      >
        <Description
          :quote="component.description.quote"
        />
      </div>
      <p v-else>-</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    components: { type: Array, required: true, default: () => new Array() },
  },
  methods: {
    typeOf(component) {
      return Object.keys(component)[0].toLowerCase();
    },
  },
};
</script>
