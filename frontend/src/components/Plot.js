import Chart from "chart.js";

function tabulate(variable) {

    console.log(variable);

    var table = {};

    for (var i = 0; i < variable.values.length; i++) {
        if (table[variable.values[i].toString()] >= 0) {
            table[variable.values[i].toString()] += 1;
        } else {
            table[variable.values[i].toString()] = 0;
        }
    }

    if (variable.labels) {
        var labelled_table = {};

        for (let i in variable.labels) {
            console.log(variable.labels[i], "=", table[i]);
            labelled_table[variable.labels[i]] = table[i];
        }

        return labelled_table;
    } else {
        return table;
    }
};

const colors = ["blue", "red", "yellow", "green"];

class Plot {

    constructor() {
        this.chart = null;
    }

    update(props) {

        const ctx = document.getElementById("chart");

        const graph = document.getElementById("graph").value;
        const depvar = document.getElementById("depvar").value;
        const indepvar = document.getElementById("indepvar").value;

        if (graph) {

            var ds = [];

            if (graph === "bar" & depvar !== "") {

                const table = tabulate(props.data[depvar]);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: props.data[depvar].label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (ds.length > 0) {

                const data = {
                    labels: ds[0].labels,
                    datasets: ds,
                };

                const config = {
                    type: graph,
                    data: data,
                    options: {
                        title: {
                            text: props.data[depvar].label,
                            display: true,
                        },
                        legend: {
                            display: false,
                        },
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
                        this.chart.data = data;
                        this.chart.config = config;
                        this.chart.update();
                    } else {

                    }
                }

                console.log(this.chart);
            } else {
                if (this.chart !== null) {
                    this.chart.display = false;
                }
            }
        }
    };
};

export default Plot;