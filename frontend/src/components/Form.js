import React, { useState, useEffect } from "react";

function Form(props) {
    const [selectedDataSet, setSelectedDataSet] = useState('');
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedDepvar, setSelectedDepvar] = useState('');
    const [selectedIndepvar, setSelectedIndepvar] = useState('');
    const [jitter, setJitter] = useState(false);
    const [jitter_sd, setJitterSD] = useState(10);
    const [bins, setBins] = useState(10);

    const dataSets = ["", "test", "ines_2020"];
    const graphs = ["", "bar", "scatter", "histogram"];

    useEffect(() => {

        props.plot.update(props.data, selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins);
    }, [selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins]);

    useEffect((e) => {

        if (props.data) {
            props.data.changeFile(selectedDataSet);
        }

        setSelectedGraph('');
        setSelectedDepvar('');
        setSelectedIndepvar('');
    }, [selectedDataSet]);

    return (
        <div id="left-bar">
            <h2>Options</h2>

            {props.data ? (
            <form name="options">
                <table><tbody>
                    <tr>
                        <td>Data set</td>
                        <td>
                            <select value={selectedDataSet} onChange={(e) => setSelectedDataSet(e.target.value)}>
                                {dataSets.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Graph type</td>
                        <td>
                                <select value={selectedGraph} onChange={(e) => setSelectedGraph(e.target.value)}>
                                {graphs.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Dependent variable</td>
                        <td>
                            <select value={selectedDepvar} onChange={(e) => setSelectedDepvar(e.target.value)}>
                                {props.data.getVariables().map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                     </tr> 

                     <tr>
                        <td>Independent variable</td>
                        <td>
                            <select value={selectedIndepvar} onChange={(e) => setSelectedIndepvar(e.target.value)}>
                                {props.data.getVariables().map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                     </tr>

                     <tr>
                        <td>
                            <input type="checkbox" checked={jitter} onChange={() => setJitter(!jitter)}/> Jitter
                        </td>
                        <td>
                            <input type="range" value={jitter_sd} onChange={(e) => setJitterSD(parseInt(e.target.value))} min="0" max="500" />
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Bins</td>
                        <td>
                            <input type="range" value={bins} onChange={(e) => setBins(parseInt(e.target.value))} min="1" max="20" />
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