import Chart from "chart.js";

function tabulate(x) {

    var table = {};

    for (var i = 0; i < x.length; i++) {
        if (table[x[i].toString()] >= 0) {
            table[x[i].toString()] += 1;
        } else {
            table[x[i].toString()] = 0;
        }
    }

    return table;
};

const colors = ["blue", "red", "yellow", "green"];

class Plot {

    constructor() {
        this.chart = null;
    }

    update(props) {

        const ctx = document.getElementById("chart");

        const graph = document.getElementById("graph");
        const depvar = document.getElementById("depvar");
        const indepvar = document.getElementById("indepvar");

        if (graph) {

            const dataset = props.data;

            var ds = [];

            if (graph.value === "bar" & depvar.value !== "") {

                const table = tabulate(dataset.data[depvar.value]);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: depvar.value,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            const data = {
                labels: ds[0].labels,
                datasets: ds,
            };

            const config = {
                type: graph.value,
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            }
                        }]
                    }
                },
            };

            if (this.chart === null) {
                this.chart = new Chart(ctx, config);
            } else {
                if (this.chart.config.type == config.type) {
                    this.chart.data.labels = data.labels;
                    this.chart.data.dataset = data.datasets;
                    this.chart.update();
                } else {

                }
            }
        }
    };
};

export default Plot;