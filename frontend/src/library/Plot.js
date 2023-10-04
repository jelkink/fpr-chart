import { Chart, LinearScale, CategoryScale, registerables } from 'chart.js';
import { BoxPlotController, BoxAndWiskers } from "@sgratzl/chartjs-chart-boxplot"
import { tabulate, tabulate_bivariate, split_by_group, pair, bin } from "./Tabulate"
import { linearRegression, minimum, maximum } from "./Stats"

Chart.register(...registerables)
Chart.register(BoxPlotController, BoxAndWiskers, LinearScale, CategoryScale)    

const singleBarChart = function(var1) {

    const table = tabulate(var1)

    return({
        labels: Object.keys(table),
        datasets: [{
            data: Object.values(table),
            label: var1.label,
            type: "bar"
        }],
        backgroundColor: "blue",
        borderWidth: 1,
    })
}

const bivariateBarChart = function(var1, var2) {

    var tables = tabulate_bivariate(var1, var2)

    return({
        labels: Object.keys(tabulate(var1)),
        datasets: tables
    })
}

const histogram = function(var1, bins) {

    const table = bin(var1, bins)

    return({
        labels: Object.keys(table),
        datasets: [{
            data: Object.values(table),
            label: var1.label,
            type: "bar"
        }],
        backgroundColor: "blue",
        borderWidth: 1,
    })
}

const boxplot = function(var1) {

    return({
        labels: [var1.label],
        datasets: [{
            data: [var1.values],
            label: var1.label,
            type: "boxplot"
        }]
    })
}

const bivariateBoxplot = function(var1, var2) {

    const values = split_by_group(var1, var2)

    return({
        labels: Object.keys(tabulate(var2)),
        datasets: [{
            data: values["values"],
            label: values["labels"],
            type: "boxplot"
        }]
    })
}

const trivariateBoxplot = function(var1, var2, var3) {

    const variables = split_by_group(var1, var3)
    const groups = split_by_group(var2, var3)
    const labels = tabulate(var3, true)

    var datasets = []

    variables.values.forEach((val, key) => {

        const variable = { values: variables.values[key] }
        const group = { values: groups.values[key] } 

        const values = split_by_group(variable, group)

        datasets.push({
            data: values["values"],
            label: Object.keys(labels)[key],
            type: "boxplot"
        })
    })

    return({
        labels: Object.keys(tabulate(var2)),
        datasets: datasets
    })
}

const scatterPlot = function(var1, var2, var3, jitter, jitter_sd, regression = false) {

    const paired = pair(var2, var1, jitter, jitter_sd)

    var ds = [{
        label: var1.label + " by " + var2.label,
        data: paired,
        type: "scatter"
    }]

    if (regression) {

        const x1 = minimum(var2.values)
        const x2 = maximum(var2.values)
            
        const y = var3 === null ? { values: [var1.values]} : split_by_group(var1, var3)
        const x = var3 === null ? { values: [var2.values]} : split_by_group(var2, var3)
        const labels = var3 === null ? var2.label : Object.keys(tabulate(var3, true))

        y.values.forEach((val, key) => {

            const coef = linearRegression(y.values[key], x.values[key])

            ds.push({
                label: labels[key],
                type: "line",
                data: [
                    { x: x1, y: x1 * coef[1] + coef[0] },
                    { x: x2, y: x2 * coef[1] + coef[0] }
                ]
            })
        })
    }

    return { datasets: ds }
}

class Plot {

    constructor() {
        this.chart = null
    }

    update(data, selectedGraph, selectedVar1, selectedVar2, selectedVar3, jitter, jitter_sd, bins, regression) {

        const ctx = document.getElementById("chart")

        var var1 = null
        var var2 = null
        var var3 = null
        var title = ''
        var labelX = ''
        var labelY = ''
        var showLegend = true

        if (data) {
            var1 = (data.hasVariable(selectedVar1) ? data.getVariable(selectedVar1) : null)
            var2 = (data.hasVariable(selectedVar2) ? data.getVariable(selectedVar2) : null)
            var3 = (data.hasVariable(selectedVar3) ? data.getVariable(selectedVar3) : null)
        }

        if (selectedGraph) {

            const newGraph = this.chart === null || this.chart.type !== selectedGraph

            var data = null

            if (selectedGraph === "bar" & var1 !== null) {

                if (var2 === null || selectedVar1 == selectedVar2) {
                    data = singleBarChart(var1)
                    title = "Bar chart of " + var1.label
                    labelX = var1.label
                    labelY = "Frequency"
                    showLegend = false
                } else {
                    data = bivariateBarChart(var1, var2)
                    title = "Bar chart of " + var2.label + " by " + var1.label
                    labelX = var1.label
                    labelY = "Frequency"
                }
            }

            if (selectedGraph === "histogram" & var1 !== null) {

                data = histogram(var1, bins)
                title = "Histogram of " + var1.label
                labelX = var1.label
                labelY = "Frequency"
                showLegend = false
            }


            if (selectedGraph === "boxplot" & var1 !== null) {

                if (var2 === null || selectedVar1 == selectedVar2) {

                    data = boxplot(var1)
                    title = "Boxplot of " + var1.label
                    labelY = var1.label
                    showLegend = false
                } else if (var3 === null) {
                    
                    data = bivariateBoxplot(var1, var2)
                    title = "Boxplot of " + var2.label + " by " + var1.label
                    labelY = var1.label
                    showLegend = false
                } else {
                                        
                    data = trivariateBoxplot(var1, var2, var3)
                    title = "Boxplot of " + var1.label + " by " + var2.label + " and " + var3.label
                    labelY = var1.label
                    showLegend = true
                }
            }

            if (selectedGraph === "scatter" & var1 !== null & var2 !== null) {

                data = scatterPlot(var1, var2, var3, jitter, jitter_sd, regression)
                title = "Scatter plot of " + var1.label + " by " + var2.label
                labelX = var2.label
                labelY = var1.label
                showLegend = var3 !== null
            }

            if (data !== null) {

                var config = {
                    data: data,
                    options: {
                        plugins: {
                            title: {
                                text: title,
                                display: true,
                            },
                            legend: {
                                position: "bottom",
                                display: showLegend
                            }
                        },
                        scales: {
                            y: {
                                title: {
                                    text: labelY,
                                    display: true
                                },
                                ticks: {
                                    beginAtZero: true,
                                }
                            },
                            x: {
                                title: {
                                    text: labelX,
                                    display: true
                                }
                            }
                        }
                    },
                }

                if (newGraph) {
                    if (this.chart !== null) this.chart.destroy()
                    this.chart = new Chart(ctx, config)
                } else {
                    this.chart.data = data
                    this.chart.type = (selectedGraph === "histogram" ? "bar" : selectedGraph)
                    this.chart.options = config.options
                    this.chart.update()
                }
            }
        }
    }
}

export default Plot