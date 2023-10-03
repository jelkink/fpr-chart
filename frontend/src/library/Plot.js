import Chart from "chart.js/auto";
import { tabulate, tabulate_bivariate, pair, bin } from "./Tabulate";

const singleBarChart = function(var1) {

    const table = tabulate(var1);

    return({
        labels: Object.keys(table),
        datasets: [{
            data: Object.values(table),
            label: var1.label
        }],
        backgroundColor: "blue",
        borderWidth: 1,
    });
}

const bivariateBarChart = function(var1, var2) {

    var tables = tabulate_bivariate(var1, var2);

    return({
        labels: Object.keys(tabulate(var1)),
        datasets: tables
    });
}

const histogram = function(var1, bins) {

    const table = bin(var1, bins);

    return({
        labels: Object.keys(table),
        datasets: [{
            data: Object.values(table),
            label: var1.label,
        }],
        backgroundColor: "blue",
        borderWidth: 1,
    });
}

const scatterPlot = function(var1, var2, jitter, jitter_sd) {

    const paired = pair(var2, var1, jitter, jitter_sd);

    return({
        datasets: [{
            label: var1.label + " by " + var2.label,
            data: paired,
        }]
    });
}

class Plot {

    constructor() {
        this.chart = null;
    }

    update(data, selectedGraph, selectedVar1, selectedVar2, jitter, jitter_sd, bins) {

        const ctx = document.getElementById("chart");

        var var1 = null;
        var var2 = null;
        var title = '';

        if (data) {
            var1 = (data.hasVariable(selectedVar1) ? data.getVariable(selectedVar1) : null);
            var2 = (data.hasVariable(selectedVar2) ? data.getVariable(selectedVar2) : null);
        }

        if (selectedGraph) {

            const newGraph = this.chart === null || this.chart.type !== selectedGraph;

            var data = null;

            if (selectedGraph === "bar" & var1 !== null) {

                if (var2 === null || selectedVar1 == selectedVar2) {
                    data = singleBarChart(var1);
                    title = var1.label;
                } else {
                    data = bivariateBarChart(var2, var1);
                    title = var1.label + " by " + var2.label;
                }
            };

            if (selectedGraph === "histogram" & var1 !== null) {

                data = histogram(var1, bins);
                title = "Histogram of " + var1.label;
            };

            if (selectedGraph === "scatter" & var1 !== null & var2 !== null) {

                data = scatterPlot(var1, var2, jitter, jitter_sd);
                title = var1.label + " by " + var2.label;
            };

            if (data !== null) {

                const config = {
                    type: (selectedGraph === "histogram" ? "bar" : selectedGraph),
                    data: data,
                    options: {
                        plugins: {
                            title: {
                                text: title,
                                display: true,
                            },
                            legend: {
                                position: "bottom",
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        beginAtZero: true,
                                    }
                                }
                            }
                        },
                    },
                };

                if (newGraph) {
                    if (this.chart !== null) this.chart.destroy();
                    this.chart = new Chart(ctx, config);
                } else {
                    this.chart.data = data;
                    this.chart.type = (selectedGraph === "histogram" ? "bar" : selectedGraph);
                    this.chart.options = config.options;
                    this.chart.update();
                }

                console.log(data);
                console.log(config);
            }
        }
    };
};

export default Plot;