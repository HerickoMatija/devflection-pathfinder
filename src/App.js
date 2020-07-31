import React from "react";
import "./App.css";
import Pathfinder from "./Pathfinder/PathFinder";

function App() {
  return (
    <Pathfinder
      startRow={10}
      startColumn={15}
      finishRow={10}
      finishColumn={35}
    ></Pathfinder>
  );
}

export default App;
