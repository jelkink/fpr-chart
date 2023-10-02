import Chart from "chart.js/auto";
import { tabulate, tabulate_bivariate, pair, bin } from "./Tabulate";

const colors = ["blue", "red", "yellow", "green"];

class Plot {

    constructor() {
        this.chart = null;
    }

    update(data, selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins) {

        const ctx = document.getElementById("chart");

        var dv = null;
        var iv = null;

        console.log("Updating plot (" + selectedGraph + ", DV:" + selectedDepvar + ", IV:" + selectedIndepvar + ")");

        if (data) {
            dv = (data.hasVariable(selectedDepvar) ? data.getVariable(selectedDepvar) : null);
            iv = (data.hasVariable(selectedIndepvar) ? data.getVariable(selectedIndepvar) : null);
        }

        if (selectedGraph) {

            const newGraph = this.chart === null || this.chart.type !== selectedGraph;

            var data = null;

            if (selectedGraph === "bar" & dv !== null) {

                if (iv === null || iv == dv) {
                    const table = tabulate(dv);

                    data = {
                        labels: Object.keys(table),
                        data: Object.values(table),
                        label: dv.label,
                        backgroundColor: colors[0],
                        borderWidth: 1,
                    };
                } else {
                    var tables = tabulate_bivariate(dv, iv);

                    data = {
                        labels: Object.values(dv.labels),
                        datasets: tables
                    };
                }
            };

            if (selectedGraph === "histogram" & dv !== null) {

                const table = bin(dv, bins);

                data = {
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: dv.label,
                    backgroundColor: colors[0],
                    borderWidth: 1,
                };
            };

            if (selectedGraph === "scatter" & dv !== null & iv !== null) {

                const paired = pair(iv, dv, jitter, jitter_sd);

                data = {
                    label: dv.label + " by " + iv.label,
                    data: paired,
                };
            };

            if (data !== null) {

                const config = {
                    type: (selectedGraph === "histogram" ? "bar" : selectedGraph),
                    data: data,
                    options: {
                        title: {
                            text: data.label,
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

                console.log(data);

                if (newGraph) {
                    if (this.chart !== null) this.chart.destroy();
                    this.chart = new Chart(ctx, config);
                } else {
                    this.chart.data = data;
                    this.chart.type = (selectedGraph === "histogram" ? "bar" : selectedGraph);
                    this.chart.options = config.options;
                    this.chart.update();
                }
            }
        }
    };
};

export default Plot;