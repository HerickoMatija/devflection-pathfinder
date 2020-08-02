import React, { Component } from "react";

import "./MenuBar.css";

export default class MenuBar extends Component {
  render() {
    const { astar, bfs, dfs, dijkstra, reset, buttonsEnabled } = this.props;

    return (
      <div className="menu-container">
        <div className="menu">
          <button
            id="bfs-btn"
            className="menu-btn"
            onClick={() => astar()}
            disabled={!buttonsEnabled}
          >
            Visualize A*
          </button>
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
          <button
            id="dfs-btn"
            className="menu-btn"
            onClick={() => dijkstra()}
            disabled={!buttonsEnabled}
          >
            Visualize Dijkstra's
          </button>
          <button id="reset-btn" className="menu-btn" onClick={() => reset()}>
            Reset board
          </button>
        </div>
      </div>
    );
  }
}
