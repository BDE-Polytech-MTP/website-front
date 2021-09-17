<template>
  <section class="container">
    <div v-for="defi in defis" v-bind:key="defi.title" class="mb-3">
      <ScoreCategorie
        :title="defi.title"
        :data="defi.data"
        :property="columns"
      />
    </div>
  </section>
</template>

<script>
import ScoreCategorie from '~/components/ScoreboardCategorie';
export default {
  name: 'Scoreboard',
  components: { ScoreCategorie },

  data() {
    return {
      defis: [],

      columns: [
        {
          field: 'defi',
          label: 'Défi',
        },
        {
          field: 'point',
          label: 'Points',
          width: '20',
          centered: true,
        },
        {
          field: 'par',
          label: 'Par',

          centered: true,
        },
      ],
    };
  },
  async mounted() {
    const result = await fetch(
      'https://script.google.com/macros/s/AKfycbycPG6g2-mBcCw1_osjhlHCRXUnjKUIsyHZUxE4LRNLP43UB6xP6dx9HZONRw0VwEsY/exec',
    ).then((res) => res.json());

    let first = false;
    let nameOfTheTeam = [];
    let categorie = {
      title: '',
      data: [],
    };

    for (let line of result.GoogleSheetdata) {
      if (line[0] == 'Team') {
        for (let i = 3; i <= 10; i++) {
          nameOfTheTeam.push(line[i]);
          this.columns.push({ field: line[i], label: line[i], centered: true });
        }
      } else if (line[0].substring(0, 9) == 'Catégorie') {
        if (first) {
          this.defis.push(categorie);
        }
        first = true;
        categorie = {
          title: line[0].substring(9),
          data: [],
        };
      } else if (line[0] == 'Total' || line[0] == '') {
      } else {
        let val = 0;
        let donnee = {};
        for (let info of line) {
          if (val == 0) {
            donnee['defi'] = info;
            val++;
          } else if (val == 1) {
            donnee['point'] = info;
            val++;
          } else if (val == 2) {
            donnee['par'] = info;

            val++;
          } else {
            if (info == '') {
              donnee[nameOfTheTeam[val - 3]] = 0;
            } else {
              donnee[nameOfTheTeam[val - 3]] = info;
            }
            val++;
          }
        }
        categorie.data.push(donnee);
      }
    }
    this.defis.push(categorie);
  },
};
</script>

<style scoped>
</style>
