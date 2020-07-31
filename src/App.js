import React from "react";
import "./App.css";
import Pathfinder from "./Pathfinder/PathFinder";

function App() {
  return (
    <Pathfinder
      rows={25}
      cols={50}
      startRow={10}
      startColumn={15}
      finishRow={10}
      finishColumn={35}
    ></Pathfinder>
  );
}

export default App;
