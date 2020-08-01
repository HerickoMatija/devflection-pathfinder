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

    let classes = "node";

    if (isStart) {
      classes += " node-start";
    }
    if (isFinish) {
      classes += " node-finish";
    }

    return (
      <div
        id={`node-${row}-${col}`}
        className={classes}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp()}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseLeave={() => onMouseLeave(row, col)}
      ></div>
    );
  }
}
