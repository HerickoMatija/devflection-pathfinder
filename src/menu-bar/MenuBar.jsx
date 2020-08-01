import React, { Component } from "react";

import "./MenuBar.css";

export default class MenuBar extends Component {
  render() {
    const { bfs, dfs, reset, visualizationEnabled, resetEnabled } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <button
            id="bfs-btn"
            className="menu-btn"
            onClick={() => bfs()}
            disabled={!visualizationEnabled}
          >
            Visualize BFS
          </button>
          <button
            id="dfs-btn"
            className="menu-btn"
            onClick={() => dfs()}
            disabled={!visualizationEnabled}
          >
            Visualize DFS
          </button>
          <button
            id="reset-btn"
            className="menu-btn"
            onClick={() => reset()}
            disabled={!resetEnabled}
          >
            Reset board
          </button>
        </div>
      </div>
    );
  }
}
