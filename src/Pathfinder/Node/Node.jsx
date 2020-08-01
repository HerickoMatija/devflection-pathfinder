import React, { Component } from "react";

import "./Node.css";

export default class Node extends Component {
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    return (
      <div
        id={`node-${row}-${col}`}
        className={getNodeClasses(isStart, isFinish)}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseLeave={() => onMouseLeave(row, col)}
      ></div>
    );
  }
}

const getNodeClasses = (isStart, isFinish) => {
  if (!isStart && !isFinish) {
    return "node";
  }
  if (isStart) {
    return "node node-start";
  }
  if (isFinish) {
    return "node node-finish";
  }
};
