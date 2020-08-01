import React, { Component } from "react";

import { bfs } from "../pathfinding-algorithms/bfs";
import { dfs } from "../pathfinding-algorithms/dfs";
import { rebuildShortestPathFromFinishNode } from "../pathfinding-algorithms/common";
import { animateSearch } from "../visualizing/visualization";

import Node from "./Node/Node";

import "./Pathfinder.css";

const BFS = "bfs";
const DFS = "dfs";

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
      this.setState({ grid: [] });
    });

    const grid = getInitialGrid(window.innerWidth, window.innerHeight);

    Promise.resolve().then(() => {
      this.setState({ grid: grid });
    });
  }

  visualize(selectedAlgorithm) {
    const { grid, startNode, finishNode } = this.state;

    let visitedNodesInOrder;
    if (selectedAlgorithm === BFS) {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    } else if (selectedAlgorithm === DFS) {
      visitedNodesInOrder = dfs(grid, startNode, finishNode);
    }

    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    animateSearch(visitedNodesInOrder, shortestPathInOrder);
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <div className="menu-container">
          <div className="menu">
            <button className="menu-button" onClick={() => this.visualize(BFS)}>
              Visualize BFS
            </button>
            <button className="menu-button" onClick={() => this.visualize(DFS)}>
              Visualize DFS
            </button>
            <button className="menu-button" onClick={() => this.resetBoard()}>
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
