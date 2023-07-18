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

class Plot {

    update(props) {

        const ctx = document.getElementById("myChart");

        const graph = document.getElementById("graph");
        const depvar = document.getElementById("depvar");
        const indepvar = document.getElementById("indepvar");

        if (graph) {

            const dataset = props.data;

            var ds = [];

            if (graph.value == "bar" & depvar.value != "") {

                const table = tabulate(dataset.data[depvar.value]);

                ds.push({
                    labels: Object.keys(table),
                    data: Object.values(table),
                    label: depvar.value,
                    borderWidth: 1,
                });
            };

            const data = {
                datasets: ds,
            };

            const config = {
                type: graph.value,
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            };

            console.log(config);

            // new Chart(ctx, config);
        }
    };
};

export default Plot;