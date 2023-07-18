import React, { useState } from "react";

function variablesToOptions(data) {
    const vars = data.getVariables();
    const lines = [];

    for (var i = 0; i < vars.length; i++) {
        lines.push(<option value={vars[i]} key={i}>{vars[i]}</option>);
    }

    return lines;
};

function Form(props) {
    const [graph, setGraph] = useState(null);
    const [depvar, setDepvar] = useState(null);
    const [indepvar, setIndepvar] = useState(null);

    function changeGraph(event) {

        setGraph(event.target.value);
        props.plot.update(props.data);
    };

    function changeDepvar(event) {

        setDepvar(event.target.value);
        props.plot.update(props.data);
    };

    function changeIndepvar(event) {

        setIndepvar(event.target.value);
        props.plot.update(props.data);
    };

    return (
        <div id="left-bar">
            <h2>Options</h2>

            {props.data ? (
            <form name="options">
                <table><tbody>
                    <tr>
                        <td>Graph type</td>
                        <td>
                            <select id="graph" onChange={changeGraph}>
                                <option value="bar">barchart</option>
                                <option value="scatter">scatterplot</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Dependent variable</td>
                        <td>
                            <select id="depvar" onChange={changeDepvar}>
                                <option value="" key="0"> </option>
                                {variablesToOptions(props.data)}
                            </select>
                        </td>
                     </tr> 

                     <tr>
                        <td>Independent variable</td>
                        <td>
                            <select id="indepvar" onChange={changeIndepvar}>
                                <option value="" key="0"></option>
                                {variablesToOptions(props.data)}
                            </select>
                        </td>
                     </tr>
                </tbody></table>
            </form>
            ) : (
                <p>Loading data ...</p>
            )}
        </div>
    )
}

export default Form;