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
      <Trombinoscope
        v-else-if="typeOf(component) == 'trombinoscope'"
        :id="component.trombinoscope.id"
        :title="component.trombinoscope.title"
        :members="component.trombinoscope.members"
      />
      <Scoreboard v-else-if="typeOf(component) == 'scoreboard'" />
      <GraphScore v-else-if="typeOf(component) == 'graphscore'"></GraphScore>

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

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'timeline'"
      >
        <Timeline
          :items="component.timeline.items"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'carousel'"
      >
        <Carousel
        :carousels="component.carousel.carousels"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'timeline'"
      >
        <Timeline :items="component.timeline.items" />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'carousel'"
      >
        <Carousel :carousels="component.carousel.carousels" />
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
          :quotes="component.description.quotes"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'social'"
      >
        <Social
          :facebook="component.social.facebook"
          :instagram="component.social.instagram"
          :snapchat="component.social.snapchat"
          :tiktok="component.social.tiktok"
          :mail="component.social.mail"
        />
      </div>

      <div
        class="background-gradient-lines"
        v-else-if="typeOf(component) == 'trombinoscope'"
      >
        <Trombinoscope
          :title="component.trombinoscope.title"
          :members="component.trombinoscope.members"
        />
      </div>

      <p v-else>-</p>
    </div>
  </div>
</template>

<script>
import SocialNetworks from '~/components/Social';
import GraphScore from '~/components/GraphScore';
import Trombinoscope from '~/components/Trombinoscope';
export default {
  components: { Trombinoscope, SocialNetworks, GraphScore},
  props: {
    components: { type: Array, required: true, default: () => [] },
  },
  methods: {
    typeOf(component) {
      return Object.keys(component)[0].toLowerCase();
    },
  },
};
</script>
