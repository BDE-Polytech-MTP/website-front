<template>
  <nav class="navbar is-fixed-top">
    <div class="navbar-brand">
      <NuxtLink
        to="/"
        @click="toggle('burger')"
      >
        <img
          style="height: 4rem; padding: 0.3rem"
          src="~assets/img/logo.png"
          alt="Logo étudiants de Polytech Montpellier"
        />
      </NuxtLink>

      <div
        id="burger"
        class="navbar-burger burger"
        data-target="navBar"
        @click="toggle('burger')"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navBar" :class="'navbar-menu ' + dropdowns.burger">
      <div class="navbar-start">
        <div class="navbar-item has-dropdown is-hoverable">
          <p class="navbar-link" @click="toggle('bureaux')">Bureaux</p>
          <div id="bureaux" :class="'navbar-dropdown ' + dropdowns.bureaux">
            <div v-for="bureau in hdr.bureaux" v-bind:key="bureau.id">
              <NuxtLink class="navbar-item" :to="'/bureaux/' + bureau.id">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <p>
                        <strong
                        >{{ bureau.emoji }}
                          {{ capitalize(bureau.nom) }}</strong
                        >
                        <br />
                        <small>{{ capitalize(bureau.header) }}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </NuxtLink>
              <hr class="dropdown-divider" />
            </div>
            <div class="navbar-item">
              <div class="navbar-content">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <strong>🏅 Adhésions</strong>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <NuxtLink to="/adhesions">
                        <b-button size="is-small"> Plus d'infos </b-button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <p class="navbar-link flex" @click="toggle('associations')">
            Associations
          </p>
          <div
            id="associations"
            :class="'navbar-dropdown ' + dropdowns.associations"
          >
            <div class="container is-fluid mt-4">
              <div class="columns">
                <div
                  class="column"
                  v-for="group in hdr.associations"
                  v-bind:key="group.type"
                >
                  <h1 class="title is-6 is-mega-menu-title">
                    {{ group.emoji }} {{ group.type }}
                  </h1>
                  <div
                    v-for="association in group.elements"
                    v-bind:key="association.nom"
                  >
                    <NuxtLink
                      :to="
                        '/associations/' +
                        association.nom.toLowerCase().replace(' ', '-')
                      "
                      class="navbar-item"
                    >
                      <div class="navbar-content">
                        <p class="has-text-info">
                          {{ capitalize(association.nom) }}
                        </p>
                        <p>
                          <small>
                            {{ association.emoji }}
                            {{ capitalize(association.responsable) }}</small
                          >
                        </p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <hr class="navbar-divider" />
            <div class="navbar-item">
              <div class="navbar-content">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <strong>🌱 Crée ton association!</strong>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <NuxtLink to="/associations/creation">
                        <b-button size="is-small"> C'est parti </b-button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable is-mega">
          <p class="navbar-link flex" @click="toggle('evenements')">
            Evenements
          </p>
          <div
            id="evenements"
            :class="'navbar-dropdown ' + dropdowns.evenements"
          >
            <div class="container is-fluid mt-4">
              <div class="columns">
                <div
                  class="column"
                  v-for="group in hdr.evenements"
                  v-bind:key="group.type"
                >
                  <h1 class="title is-6 is-mega-menu-title">
                    {{ group.emoji }} {{ capitalize(group.type) }}
                  </h1>
                  <div v-for="event in group.elements" v-bind:key="event.id">
                    <NuxtLink
                      :to="'/evenements/' + event.id"
                      class="navbar-item"
                    >
                      <div class="navbar-content">
                        <p class="has-text-info">{{ event.nom }}</p>
                        <p>
                          <small>
                            {{ event.emoji }}
                            {{ capitalize(event.lieu) }}</small
                          >
                        </p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>

            <hr class="navbar-divider" />
            <div class="navbar-item">
              <div class="navbar-content">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <strong>🎟️ Réservaaations!</strong>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <NuxtLink to="/reservations">
                        <b-button size="is-small"> Vite vite! </b-button>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink
          :to="'/equipe/'"
          class="navbar-item"
        >
          <div
            class="navbar-item is-hoverable is-arrowless is-mega"
            @click="toggle('burger')"
          >
            <p class="navbar-link flex is-arrowless">
              L'équipe
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          :to="'/compte/'"
          class="navbar-item"
          v-if="$auth.loggedIn"
        >
          <div
            class="navbar-item is-hoverable is-arrowless is-mega"
            @click="toggle('burger')"
            >
            <p class="navbar-link flex is-arrowless">
              Mon compte
            </p>
          </div>
        </NuxtLink>

        <NuxtLink
          :to="'/validationMembres/'"
          class="navbar-item"
          v-if="$auth.loggedIn && $auth.user.roles.length !== 0"
        >
        <!-- if the user is logged in and its an admin -->
          <div
            class="navbar-item is-hoverable is-arrowless is-mega"
            @click="toggle('burger')"
          >
            <p class="navbar-link flex is-arrowless">
              Validation membres
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="navbar-end mr-4">
        <div class="buttons">
          <b-button
            icon-left="facebook"
            class="has-text-info"
            v-if="social.facebook"
            @click="socialNetworkRedirect(social.facebook)"
          />
          <b-button
            icon-left="heart"
            class="has-text-danger mr-5"
            @click="handleLike()"
          />
          <b-button
            type="is-primary"
            icon-left="logout"
            @click="handleLogout()"
            v-if="$auth.loggedIn"
          >
            Déconnexion
          </b-button>
          <b-button
            type="is-primary"
            icon-left="account"
            v-else
            @click="isLoginModalActive = true"
          >
            Connexion
          </b-button>

          <b-button
            type="is-light"
            v-if='!$auth.loggedIn'
            @click ="isSignInModalActive = true"
          >
            Inscription
          </b-button>

        </div>
      </div>
    </div>

    <b-modal
      v-model="isSignInModalActive"
      :can-cancel="[false, false, false]"
      aria-role="dialog"
      has-modal-card
    >
      <div>
        <SignIn @close="isSignInModalActive = false" @signin="handleSignIn()" />
      </div>
    </b-modal>

    <b-modal
      v-model="isLoginModalActive"
      :can-cancel="[false, false, false]"
      aria-role="dialog"
      has-modal-card
    >
      <div>
        <Login @close="isLoginModalActive = false" @login="handleLogin()" />
      </div>
    </b-modal>
  </nav>
</template>

<script>
import website from '~/static/website.json';
import social from '~/static/social-networks.json';
import SignIn from '~/components/SignIn';

export default {
  name: 'Navbar',
  components: { SignIn },
  data() {
    return {
      hdr: website,
      social: social,
      dropdowns: {
        burger: '',
        evenements: '',
        bureaux: '',
        associations: '',
      },
      isLoginModalActive: false,
      isSignInModalActive: false,
    };
  },
  methods: {
    toggle(dropdown) {
      if (this.dropdowns[dropdown] == '') {
        this.dropdowns[dropdown] = 'is-active';
      } else {
        this.dropdowns[dropdown] = '';
      }
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    socialNetworkRedirect(url) {
      window.open(url, '_blank');
    },
    handleLike() {
      this.$buefy.toast.open({
        message: "Merci d'avoir donné ton avis 💗",
        type: 'is-danger',
      });
    },
    handleLogin() {
      this.isLoginModalActive = false;
      this.$buefy.toast.open({
        message: 'Tu es maintenant connecté ✅',
        type: 'is-success',
      });
    },
    handleSignIn(){
      this.isSignInModalActive = false;
      this.$buefy.toast.open({
        message: 'Ton compte est maintenant en attente de validation 🛡️',
        type: 'is-success',
      });
    },
    handleLogout() {
      this.$auth.logout().then(() => {
        this.hdr = `${this.hdr}`; // Workaround to trigger a refresh of the view
        this.$buefy.toast.open({
          message: 'Tu es maintenant déconnecté 🌙',
          type: 'is-warning',
        });
      });
    },
  },
  mounted() {
    const navbar = document.getElementById('navBar');
    const dropdowns = navbar.querySelectorAll('.navbar-dropdown');
    dropdowns.forEach((dp) => {
      dp.addEventListener('click', () => {
        navbar.classList.remove('is-active');
        dp.classList.remove('is-active');
        this.toggle('burger');
      });
    });
  },
};
</script>

<style lang="css" scoped>
@media screen and (max-width: 1024px) {
  .navbar-dropdown {
    display: none;
  }
  .navbar-dropdown.is-active {
    display: block !important;
  }
}
@media screen and (min-width: 1025px) {
  .navbar-item.is-hoverable:hover .navbar-dropdown {
    display: block !important;
  }
  .navbar-item.is-hoverable:focus-within .navbar-dropdown {
    display: none;
  }
}
</style>
