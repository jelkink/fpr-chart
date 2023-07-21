import Chart from "chart.js";
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

function bin(variable) {

    const bins = document.getElementById("bins").value;

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
    console.log(min, max, binsize, bins);

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

function pair(x, y) {

    const jitter = document.getElementById("jitter").checked;
    const jitter_sd = document.getElementById("jitter-sd").value;

    var paired = [];

    if (jitter) {
        for (var i = 0; i < x.values.length; i++) {

            var newx = rand_normal(x.values[i], jitter_sd / 100.0);
            var newy = rand_normal(y.values[i], jitter_sd / 100.0);
            paired.push({x: newx, y: newy});
        }
    } else {
        for (var i = 0; i < x.values.length; i++) {
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

            if (graph === "histogram" & depvar !== "") {

                const table = bin(props.data[depvar]);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: props.data[depvar].label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (graph === "scatter" & depvar !== "" & indepvar !== "") {

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
                    type: (graph === "histogram" ? "bar" : graph),
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
                    this.chart.data = data;
                    this.chart.type = graph;
                    this.chart.config = config;
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