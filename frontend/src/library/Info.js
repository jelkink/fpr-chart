import React, { useState } from "react";

class Info {

    constructor() {

        const [information, setInformation] = useState('');

        this.setInformation = setInformation;

        return (
            <div name="info">
                <h2>Info</h2>
                <div dangerouslySetInnerHTML={{ __html: information }}></div>
            </div>
        )
    }

    updateVariableDescription(data, selectedDepvar, selectedIndepvar) {

        var desc = '';

        if (data) {
            if (selectedDepvar) {
                desc += "<h3>Dependent variable</h3>" + data.getDescription(selectedDepvar);
            }
            
            if (selectedIndepvar) {
                desc += "<h3>Independent variable</h3>" + data.getDescription(selectedIndepvar);
            }
        }

        this.setInformation(desc);
    }
};

export default Info;