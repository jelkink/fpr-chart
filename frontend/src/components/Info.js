import React, { useState, useEffect } from "react";

function Info() {

    const [information, setInformation] = useState('');

    return (
        <div name="info">
            <h2>Info</h2>
            {information}
        </div>
    )
};

Info.prototype.updateVariableDescription = async function(data, selectedDepvar, selectedIndepvar) {

    this.setInformation("<h3>Dependent variable</h3>" + data.getVariableDescription(selectedDepvar) +
    "<h3>Independent variable</h3>" + data.getVariableDescription(selectedIndepvar));
}

export default Info;