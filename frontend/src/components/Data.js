function Data() {
    this.data = null;
}

Data.prototype.load = async function() {

    if (this.data === null) {
        console.log("Loading data");

        try {
            const response = await fetch("./test_data.json");
            this.data = await response.json();
        } catch (error) {
            console.log("Fetching data files: ", error);
        }

        console.log("Data ready");
    }
}

Data.prototype.getVariables = function() {
    return this.data.variables.join(", ");
}

export default Data;