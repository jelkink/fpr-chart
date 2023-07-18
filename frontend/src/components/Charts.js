import React, { useEffect, useState } from "react";
import Data from "./Data"

function Charts() {

    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {

            const res = new Data();
            await res.load();

            setData(res);
        }

        fetchData();
    }, []);

    return (
        <div>
          <h1>Charts</h1>
          {data ? (
            <p>Variables: {data.getVariables()}</p>
          ) : (
            <p>Data loading...</p>
          )}
        </div>
    );
}

export default Charts;