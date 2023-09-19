import React from "react";

function Info(props) {

    return (
        <div name="info">
            <h2>Info</h2>
            {props.message}
        </div>
    )
};

export default Info;