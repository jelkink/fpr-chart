import React, { useEffect, useState } from "react";
import "./css/App.css";

import Data from "./components/Data"
import Header from "./components/Header";
import Form from "./components/Form";
import Canvas from "./components/Canvas";
import Status from "./components/Status";
import Plot from "./library/Plot";

function App() {

  const [data, setData] = useState(null);
  const [plot, setPlot] = useState(new Plot());

  useEffect(() => {
      async function fetchData() {

          const res = new Data();
          await res.load();

          setData(res);
      }

      fetchData();
  }, []);

  return (
    <div id="App">
      {<Header />}
      <div id="main">
        {<Form data={data} plot={plot}/>}
        {<Canvas/>}
      </div>
      {<Status message=""/>}
    </div>
  );
}

export default App;
