import React, { useEffect, useState } from "react";
import "./css/App.css";

import Data from "./components/Data"
import Header from "./components/Header";
import Form from "./components/Form";
import Canvas from "./components/Canvas";
import RightPanel from "./components/RightPanel";

import Info from "./library/Info";
import Plot from "./library/Plot";

function App() {

  const [data, setData] = useState(null);
  
  const plot = new Plot();
  const info = new Info();

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
        <div id="left">
        {<Form data={data} plot={plot} info={info} />}
        </div>
        {<Canvas/>}
        {<RightPanel info={info} />}
      </div>
    </div>
  );
}

export default App;
