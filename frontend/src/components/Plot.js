import Chart from "chart.js";

function tabulate(variable) {

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
            labelled_table[variable.labels[i]] = table[i];
        }

        return labelled_table;
    } else {
        return table;
    }
};

function pair(x, y) {

    var paired = [];

    for (var i = 0; i < x.values.length; i++) {
        paired.push({x: x.values[i], y: y.values[i]});
    }

    return paired;
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

            if (graph === "scatter" & depvar !== "" & indepvar != "") {

                const paired = pair(props.data[indepvar], props.data[depvar]);

                ds.push({
                    label: props.data[depvar].label + " by " + props.data[indepvar].label,
                    data: paired,
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
                            text: ds[0].label,
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
            } else {
                if (this.chart !== null) {
                    this.chart.display = false;
                }
            }
        }
    };
};

export default Plot;