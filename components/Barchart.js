import { Bar, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: { type: Object },
  },
  mounted() {
    fetch(
      'https://script.google.com/macros/s/AKfycbycPG6g2-mBcCw1_osjhlHCRXUnjKUIsyHZUxE4LRNLP43UB6xP6dx9HZONRw0VwEsY/exec',
    )
      .then((response) => response.json())
      .then((result) => {
        for (let line of result.GoogleSheetdata) {
          if (line[0] == 'Total') {
            for (let i = 3; i <= 10; i++) {
              this.chartData.datasets[0].data.push(line[i]);
            }
          }
          if (line[0] == 'Team') {
            for (let i = 3; i <= 10; i++) {
              this.chartData.labels.push(line[i]);
            }
          }
        }

        this.renderChart(this.chartData, this.options);
        this.whenLoad();
      });
  },
  methods: {
    whenLoad() {
      this.$emit('load');
    },
  },
};
