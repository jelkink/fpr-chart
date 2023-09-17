import Chart from "chart.js/auto";
import rand_normal from "../library/Stats";

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

function bin(variable, bins) {

    var table = [];
    var labelled_table = {};
    var idx = 0;
    var min = Infinity;
    var max = -Infinity;

    for (var i = 0; i < variable.values.length; i++) {
        if (variable.values[i] > max) {
            max = variable.values[i];
        }
        if (variable.values[i] < min) {
            min = variable.values[i];
        }
    }

    var binsize = (max - min) / bins;

    for (i = 0; i < bins; i++) {
        table[i] = 0;
    }

    for (i = 0; i < variable.values.length; i++) {
        idx = variable.values[i] === max ? bins-1 : Math.floor((variable.values[i] - min) / binsize);
        table[idx] += 1;
    }

    for (i = 0; i < bins; i++) {
        
        labelled_table["[" + Math.round(min + i * binsize) + "-" + Math.round(min + (i+1) * binsize) + ")"] = table[i];
    }

    return labelled_table;
};

function pair(x, y, jitter, jitter_sd) {

    var paired = [];
    var i;

    if (jitter) {
        for (i = 0; i < x.values.length; i++) {

            var newx = rand_normal(x.values[i], jitter_sd / 100.0);
            var newy = rand_normal(y.values[i], jitter_sd / 100.0);
            paired.push({x: newx, y: newy});
        }
    } else {
        for (i = 0; i < x.values.length; i++) {
            paired.push({x: x.values[i], y: y.values[i]});
        }
    }

    return paired;
};

const colors = ["blue", "red", "yellow", "green"];

class Plot {

    constructor() {
        this.chart = null;
    }

    update(props, selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins) {

        const ctx = document.getElementById("chart");

        console.log("Updating plot (" + selectedGraph + ", DV:" + selectedDepvar + ", IV:" + selectedIndepvar + ")");

        if (selectedGraph) {

            var ds = [];

            if (selectedGraph === "bar" & selectedDepvar !== "") {

                const table = tabulate(props.data[selectedDepvar]);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: props.data[selectedDepvar].label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (selectedGraph === "histogram" & selectedDepvar !== "") {

                const table = bin(props.data[selectedDepvar], bins);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: props.data[selectedDepvar].label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (selectedGraph === "scatter" & selectedDepvar !== "" & selectedIndepvar !== "") {

                const paired = pair(props.data[selectedIndepvar], props.data[selectedDepvar], jitter, jitter_sd);

                ds.push({
                    label: props.data[selectedDepvar].label + " by " + props.data[selectedIndepvar].label,
                    data: paired,
                });
            };

            if (ds.length > 0) {

                const data = {
                    labels: ds[0].labels,
                    datasets: ds,
                };

                const config = {
                    type: (selectedGraph === "histogram" ? "bar" : selectedGraph),
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
                            y: {
                                ticks: {
                                    beginAtZero: true,
                                }
                            }
                        }
                    },
                };

                if (this.chart === null) {
                    this.chart = new Chart(ctx, config);
                } else {
                    this.chart.data = data;
                    this.chart.type = (selectedGraph === "histogram" ? "bar" : selectedGraph);
                    this.chart.options = config.options;
                    this.chart.update();
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