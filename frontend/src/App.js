import React from "react";
import "./css/App.css";
import {
        BrowserRouter as Router,
        Routes,
        Route,
} from "react-router-dom";

import Charts from "./components/Charts";

function App() {
  return (
    <Router>
      <div id="App">
        <Routes>
          <Route path="/" element={<Charts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
