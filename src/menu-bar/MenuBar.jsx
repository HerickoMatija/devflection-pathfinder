import React, { Component } from "react";

import "./MenuBar.css";

export default class MenuBar extends Component {
  render() {
    const { bfs, dfs, reset, buttonsEnabled } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <button
            id="bfs-btn"
            className="menu-btn"
            onClick={() => bfs()}
            disabled={!buttonsEnabled}
          >
            Visualize BFS
          </button>
          <button
            id="dfs-btn"
            className="menu-btn"
            onClick={() => dfs()}
            disabled={!buttonsEnabled}
          >
            Visualize DFS
          </button>
          <button id="reset-btn" className="menu-btn" onClick={() => reset()}>
            Reset board
          </button>
        </div>
      </div>
    );
  }
}
