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
      .then((response) => response.body)
      .then((rb) => {
        const reader = rb.getReader();
        return new ReadableStream({
          start(controller) {
            // The following function handles each data chunk
            function push() {
              // "done" is a Boolean and value a "Uint8Array"
              reader.read().then(({ done, value }) => {
                // If there is no more data to read
                if (done) {
                  controller.close();
                  return;
                }
                // Get the data and send it to the browser via the controller
                controller.enqueue(value);

                push();
              });
            }
            push();
          },
        });
      })
      .then((stream) => {
        // Respond with our stream
        return new Response(stream, {
          headers: { 'Content-Type': 'text/html' },
        }).text();
      })
      .then((result) => {
        for (let line of JSON.parse(result).GoogleSheetdata) {
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
