function Data() {
    
    this.data = null;
    this.filename = "test"
}

Data.prototype.changeFile = async function(name) {

    this.filename = name;
    this.load();
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

Data.prototype.getVariables = function() {
    return Object.keys(this.data);
}

export default Data;