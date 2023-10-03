import { rand_normal } from "../library/Stats";
import { round } from "../library/FormatUtils";

function tabulate(variable, labelled = true) {

    var table = [];

    for (var i = 0; i < variable.values.length; i++) {
        if (table[variable.values[i].toString()] >= 0) {
            table[variable.values[i].toString()] += 1;
        } else {
            table[variable.values[i].toString()] = 1;
        }
    }

    if (variable.labels && labelled) {
        var labelled_table = [];

        for (let i in variable.labels) {
            labelled_table[variable.labels[i]] = table[i];
        }

        return labelled_table;
    } else {
        return table;
    }
};

function tabulate_bivariate(variable, groups) {

    const group_table = tabulate(groups, false);
    const group_table_labelled = tabulate(groups, true);

    var tables = [];

    Object.entries(group_table).forEach((group_count, group_key) => {

        var v = {};
        var tab = {};
        
        v.values = variable.values.filter((val, key) => groups.values[key].toString() == group_count[0]);

        tab.data = Object.values(tabulate(v, false));
        tab.label = Object.keys(group_table_labelled)[group_key];

        tables[group_key] = tab;
    });

    return tables;
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
        idx = variable.values[i] > max - binsize ? bins-1 : Math.floor((variable.values[i] - min) / binsize);
        table[idx] += 1;
    }

    for (i = 0; i < bins; i++) {
        
        labelled_table[round(min + i * binsize, 2) + "-" + round(min + (i+1) * binsize, 2)] = table[i];
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

export { tabulate, tabulate_bivariate, bin, pair };