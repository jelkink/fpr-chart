import Chart from "chart.js/auto";
import { tabulate, pair, bin } from "./Tabulate";

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

            var ds = [];

            if (selectedGraph === "bar" & dv !== null) {

                const table = tabulate(dv);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: dv.label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (selectedGraph === "histogram" & dv !== null) {

                const table = bin(dv, bins);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: dv.label,
                    backgroundColor: colors[ds.length],
                    borderWidth: 1,
                });
            };

            if (selectedGraph === "scatter" & dv !== null & iv !== null) {

                console.log("IV: ", iv);
                const paired = pair(iv, dv, jitter, jitter_sd);

                ds.push({
                    label: dv.label + " by " + iv.label,
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

                if (newGraph) {
                    if (this.chart !== null) this.chart.destroy();
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