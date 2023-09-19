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

export { tabulate, bin, pair };