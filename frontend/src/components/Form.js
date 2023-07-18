function variablesToOptions(data) {
    const vars = data.getVariables();
    const lines = [];

    for (var i = 0; i < vars.length; i++) {
        lines.push(<option value="{vars[i]}">{vars[i]}</option>);
    }

    return lines;
};

function Form(props) {

    return (
        <div id="left-bar">
            <h2>Options</h2>

            <form name="options">
                <table>
                    <tr>
                        <td>Graph type</td>
                        <td>
                            <select name="graph">
                                <option value="barchart">barchart</option>
                                <option value="scatterplot">scatterplot</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Dependent variable</td>
                        <td>
                            <select name="depvar">
                                <option value=""></option>
                                {props.data ? (
                                    variablesToOptions(props.data)
                                ) : (
                                    <option value="">Loading...</option>
                                )}
                            </select>
                        </td>
                     </tr> 

                     <tr>
                        <td>Independent variable</td>
                        <td>
                            <select name="indepvar">
                                <option value=""></option>
                                {props.data ? (
                                    variablesToOptions(props.data)
                                ) : (
                                    <option value="">Loading...</option>
                                )}
                            </select>
                        </td>
                     </tr>
                </table>
            </form>
        </div>
    )
}

export default Form;