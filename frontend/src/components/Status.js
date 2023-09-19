import React from "react";

function Status(props) {

    return (
        <div name="status">
            <h2>Status</h2>
            {props.message}
        </div>
    )
};

export default Status;