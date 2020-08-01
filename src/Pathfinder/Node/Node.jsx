import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const { row, col, type, toggleCellCallback } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${type}`}
        onClick={toggleCellCallback}
      ></div>
    );
  }
}
