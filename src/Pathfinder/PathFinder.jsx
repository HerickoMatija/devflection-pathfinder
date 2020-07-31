import React, { Component } from "react";

import { bfs } from "../pathfinding-algorithms/bfs";
import { dfs } from "../pathfinding-algorithms/dfs";
import { rebuildShortestPathFromFinishNode } from "../pathfinding-algorithms/common";

import "./Pathfinder.css";

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      animating: false,
      done: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(window.innerWidth, window.innerHeight);
    this.setState({ grid });
  }

  resetBoard() {
    Promise.resolve().then(() => {
      this.setState({ grid: [], animating: false, done: false });
    });

    const grid = getInitialGrid(window.innerWidth, window.innerHeight);

    Promise.resolve().then(() => {
      this.setState({ grid: grid });
    });
  }

  visualizeBfs() {
    Promise.resolve().then(() => {
      this.setState({ animating: true });
    });

    const { grid, startNode, finishNode } = this.state;

    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    this.animateSearch(visitedNodesInOrder, shortestPathInOrder);
  }

  visualizeDfs() {
    Promise.resolve().then(() => {
      this.setState({ animating: true });
    });

    const { grid, startNode, finishNode } = this.state;

    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    this.animateSearch(visitedNodesInOrder, shortestPathInOrder);
  }

  animateSearch(visitedNodesInOrder, shortestPathInOrder) {
    for (let [index, node] of visitedNodesInOrder.entries()) {
      setTimeout(
        addCssClassToNode.bind(null, node, "node-visited"),
        10 * index
      );
    }

    setTimeout(() => {
      this.animateShortestPath(shortestPathInOrder);
    }, 10 * visitedNodesInOrder.length);

    setTimeout(() => {
      this.setState({ animating: false, done: true });
    }, 10 * visitedNodesInOrder.length + 1300);
  }

  animateShortestPath(shortestPathInOrder) {
    for (let [index, node] of shortestPathInOrder.entries()) {
      setTimeout(
        addCssClassToNode.bind(null, node, "node-shortest-path"),
        25 * index
      );
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <div className="menu-container">
          <div className="menu">
            <button
              className="menu-button"
              disabled={this.state.animating || this.state.done}
              onClick={() => this.visualizeBfs()}
            >
              Visualize BFS
            </button>
            <button
              className="menu-button"
              disabled={this.state.animating || this.state.done}
              onClick={() => this.visualizeDfs()}
            >
              Visualize DFS
            </button>
            <button
              className="menu-button"
              disabled={this.state.animating}
              onClick={() => this.resetBoard()}
            >
              Reset board
            </button>
          </div>
        </div>

        <div className="pathfinder-main">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, type } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        type={type}
                        row={row}
                        toggleCellCallback={() => this.toggleCell(row, col)}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }

  toggleCell(row, col) {
    const node = this.state.grid[row][col];
    const startNode = this.state.startNode;
    const finishNode = this.state.finishNode;

    node.type = "node-start";

    if (startNode != null) {
      startNode.type = "node-finish";
    }
    if (finishNode != null) {
      finishNode.type = "";
    }

    this.setState({
      startNode: node,
      finishNode: startNode,
    });
  }
}

const getInitialGrid = (width, height) => {
  const availableWidth = Math.floor(width * 0.8) - 50;
  const availableHeight = Math.floor(height * 0.8) - 50;

  const possibleRows = Math.floor(availableHeight / 25);
  const possibleCols = Math.floor(availableWidth / 25);

  const grid = [];

  for (let row = 0; row < possibleRows; row++) {
    const currentRow = [];
    for (let col = 0; col < possibleCols; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    type: "node",
    isVisited: false,
    previousNode: null,
  };
};

const addCssClassToNode = (node, cssClass) => {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
};

const Node = ({ row, col, type, toggleCellCallback }) => {
  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${type}`}
      onClick={toggleCellCallback}
    ></div>
  );
};
