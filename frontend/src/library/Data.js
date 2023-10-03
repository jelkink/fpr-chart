import { tabulate } from "./Tabulate";
import { mean, stddev, minimum, maximum } from "./Stats";

function Data() {

    this.data = null;
    this.filename = ""
}

Data.prototype.changeFile = async function(name) {

    this.filename = name;
    await this.load();
}

Data.prototype.load = async function() {

    console.log("Loading data (" + this.filename + ")");

    try {
        const response = await fetch("./data/" + this.filename + "_data.json");
        this.data = await response.json();
    } catch (error) {
        console.log("Fetching data files: ", error);
    }

    console.log("Data ready");
}

Data.prototype.getVariableNames = function() {
    if (this.data !== null) {
        return [''].concat(Object.keys(this.data));
    } else {
        return [''];
    }
}

Data.prototype.hasVariable = function(v) {
    if (this.data !== null) {
        return Object.keys(this.data).includes(v);
    } else {
        return false;
    }
}

Data.prototype.getVariable = function(v) {
    if (this.hasVariable(v)) {
        return this.data[v];
    } else {
        return [];
    }
}

Data.prototype.getDescription = function(v) {

    var res = "<i>" + v + "</i>: ";

    v = this.getVariable(v);

    const table = tabulate(v);

    res += v.label;
    res += "<br/><br/><table>";

    if (v.labels) {
        for (const key in v.labels) {
            res += "<tr><td>" + key + "</td><td>" + v.labels[key] + "</td><td>" + table[v.labels[key]] + "</td></tr>";
        }
    } else {
        res += "<tr><td>Minimum</td><td>" + minimum(v.values) + "</td></tr>";
        res += "<tr><td>Mean</td><td>" + mean(v.values) + "</td></tr>";
        res += "<tr><td>Maximum</td><td>" + maximum(v.values) + "</td></tr>";
        res += "<tr><td>Standard deviation</td><td>" + stddev(v.values) + "</td></tr>";
    }

    res += "</table>";

    return res;
}

export default Data;