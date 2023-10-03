import React, { useState, useEffect } from "react";

function Form({data, plot, info}) {

    const dataSets = ["ines_2020", "test"];
    const graphs = ["", "bar", "scatter", "histogram"];

    const [selectedDataSet, setSelectedDataSet] = useState(dataSets[1]);
    const [selectedGraph, setSelectedGraph] = useState('');
    const [selectedVar1, setSelectedVar1] = useState('');
    const [selectedVar2, setSelectedVar2] = useState('');
    const [jitter, setJitter] = useState(false);
    const [jitter_sd, setJitterSD] = useState(10);
    const [bins, setBins] = useState(10);

    useEffect(() => {

        plot.update(data, selectedGraph, selectedVar1, selectedVar2, jitter, jitter_sd, bins);
        info.updateVariableDescription(data, selectedVar1, selectedVar2);
    }, [selectedGraph, selectedVar1, selectedVar2, jitter, jitter_sd, bins]);

    useEffect((e) => {

        if (data) {

            data.changeFile(selectedDataSet)
                .then(() => {
                    setSelectedGraph('');
                    setSelectedVar1(data.getVariableNames()[0]);
                    setSelectedVar2(data.getVariableNames()[0]);
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
                        <td>Variable 1</td>
                        <td>
                            <select value={selectedVar1} onChange={(e) => setSelectedVar1(e.target.value)}>
                                {data.getVariableNames().map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </td>
                     </tr> 

                     <tr>
                        <td>Variable 2</td>
                        <td>
                            <select value={selectedVar2} onChange={(e) => setSelectedVar2(e.target.value)}>
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