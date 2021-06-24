<!-- Use to build team page with information in website.json -->

<template>
  <div class="container">
    <div class="section">
      <div class="columns">
        <div class="column has-text-centered">
          <h1 class="title">
            Voici notre équipe
          </h1>
          <br>
        </div>
      </div>
      <div
        v-for="(team, key) in components"
        v-bind:key="key"
        class="container"
      >
        <!-- Introduction of the team -->
        <Team
          :title="team.title"
          :descr="team.description"
        />
        <div class="row columns is-multiline">

          <!-- Presentation of members -->
          <div class="columns is-multiline">
            <div
              v-for="(member, k) in team.members"
              v-bind:key="k"
              class = "column is-4"
            >
              <Member
                :picture="member.picture"
                :firstName="member.firstName"
                :lastName="member.lastName"
                :mail="member.mail"
                :place="member.place"
                :education="member.education"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuilderTeam",
  props: {
    components: { type: Array, required: true, default: () => [] },
  },
};
</script>

<style scoped>

</style>
