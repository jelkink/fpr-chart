import React, { useState, useEffect } from "react";

function Form({data, plot, info}) {

    const [selectedDataSet, setSelectedDataSet] = useState('test');
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedDepvar, setSelectedDepvar] = useState('');
    const [selectedIndepvar, setSelectedIndepvar] = useState('');
    const [jitter, setJitter] = useState(false);
    const [jitter_sd, setJitterSD] = useState(10);
    const [bins, setBins] = useState(10);

    const dataSets = ["test", "ines_2020"];
    const graphs = ["", "bar", "scatter", "histogram"];

    console.log(info);

    useEffect(() => {

        plot.update(data, selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins);
        info.updateVariableDescription(data, selectedDepvar, selectedIndepvar);
    }, [selectedGraph, selectedDepvar, selectedIndepvar, jitter, jitter_sd, bins]);

    useEffect((e) => {

        if (data) {

            data.changeFile(selectedDataSet)
                .then(() => {
                    setSelectedGraph('');
                    setSelectedDepvar(data.getVariableNames()[1]);
                    setSelectedIndepvar(data.getVariableNames()[1]);
                });
        }
    }, [selectedDataSet]);

    return (
        <div id="left-bar">
            <h2>Options</h2>

            {data ? (
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
                                {data.getVariableNames().map((option, index) => (
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
                                {data.getVariableNames().map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                     </tr>
                     
                     <tr>
                        <td height="20px"></td>
                     </tr>

                     <tr>
                        <td>
                            Jitter <input type="checkbox" checked={jitter} onChange={() => setJitter(!jitter)}/> on/off
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