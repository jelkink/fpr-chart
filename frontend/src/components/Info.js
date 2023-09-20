import React, { useState, useEffect } from "react";

function Info() {

    const [information, setInformation] = useState('');

    function updateVariableDescription(data, selectedDepvar, selectedIndepvar) {

        setInformation("<h3>Dependent variable</h3>" + data.getVariableDescription(selectedDepvar) +
                       "<h3>Independent variable</h3>" + data.getVariableDescription(selectedIndepvar));
    };

    return (
        <div name="info">
            <h2>Info</h2>
            {information}
        </div>
    )
};

export default Info;