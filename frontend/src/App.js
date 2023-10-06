import React from "react";
import { HashRouter } from 'react-router-dom';
import "./css/App.css";

import Header from "./components/Header";
import Form from "./components/Form";
import Canvas from "./components/Canvas";
import RightPanel from "./components/RightPanel";

import Data from "./library/Data";
import Info from "./library/Info";
import Plot from "./library/Plot";

function App() {

  console.log("Initiating app");

  const plot = new Plot();
  const info = new Info();
  const data = new Data();

  return (
    <HashRouter>
      <div id="App">
        {<Header />}
        <div id="main">
          <div id="left">
          {<Form data={data} plot={plot} info={info} />}
          </div>
          {<Canvas/>}
          {<RightPanel />}
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
