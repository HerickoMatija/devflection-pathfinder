import React, { Component } from "react";

import { bfs } from "../pathfinding-algorithms/bfs";
import { dfs } from "../pathfinding-algorithms/dfs";
import { dijkstra } from "../pathfinding-algorithms/dijkstra";
import { rebuildShortestPathFromFinishNode } from "../pathfinding-algorithms/common";
import { animateSearch } from "../visualizing/visualization";

import Node from "./node/Node";
import MenuBar from "../menu-bar/MenuBar";

import "./Pathfinder.css";

const BFS = "bfs";
const DFS = "dfs";
const DIJKSTRA = "dijkstra";

const START_NODE_ROW = 5;
const START_NODE_COL = 5;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 10;

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      startNode: null,
      finishNode: null,
      buttonsEnabled: true,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(window.innerWidth, window.innerHeight);

    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    this.setState({ grid, startNode, finishNode });
  }

  resetBoard() {
    const { animationTimers } = this.state;

    for (let animationTimer of animationTimers) {
      clearTimeout(animationTimer);
    }

    const grid = getInitialGrid(window.innerWidth, window.innerHeight);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    Promise.resolve().then(() => {
      this.setState({
        grid: [],
        animationTimers: null,
      });
    });

    Promise.resolve().then(() => {
      this.setState({
        grid,
        startNode,
        finishNode,
        buttonsEnabled: true,
      });
    });
  }

  visualize(selectedAlgorithm) {
    const { grid, startNode, finishNode } = this.state;

    let visitedNodesInOrder;
    if (selectedAlgorithm === BFS) {
      visitedNodesInOrder = bfs(grid, startNode, finishNode);
    } else if (selectedAlgorithm === DFS) {
      visitedNodesInOrder = dfs(grid, startNode, finishNode);
    } else if (selectedAlgorithm === DIJKSTRA) {
      visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    }

    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    const animationTimers = animateSearch(
      visitedNodesInOrder,
      shortestPathInOrder
    );

    this.setState({ buttonsEnabled: false, animationTimers });
  }

  handleMouseDown(row, col) {
    const node = this.state.grid[row][col];

    if (!node.isStart && !node.isFinish) {
      return;
    }

    if (node.isStart) {
      this.setState({ mouseIsPressed: true, movingNode: "start" });
    } else {
      this.setState({ mouseIsPressed: true, movingNode: "finish" });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    const node = this.state.grid[row][col];

    if (this.state.movingNode === "start") {
      node.isStart = true;
      this.setState({ startNode: node });
    } else {
      node.isFinish = true;
      this.setState({ finishNode: node });
    }
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  handleMouseLeave(row, col) {
    if (!this.state.mouseIsPressed) return;

    const node = this.state.grid[row][col];

    if (this.state.movingNode === "start") {
      node.isStart = false;
    }
    if (this.state.movingNode === "finish") {
      node.isFinish = false;
    }
  }

  render() {
    const { grid, buttonsEnabled } = this.state;

    return (
      <>
        <MenuBar
          bfs={() => this.visualize(BFS)}
          dfs={() => this.visualize(DFS)}
          dijkstra={() => this.visualize(DIJKSTRA)}
          reset={() => this.resetBoard()}
          buttonsEnabled={buttonsEnabled}
        ></MenuBar>

        <div className="pathfinder-main">
          <div className="grid">
            {grid.map((row, rowIdx) => {
              return (
                <div key={rowIdx}>
                  {row.map((node, nodeIdx) => {
                    const { row, col, isStart, isFinish } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isStart={isStart}
                        isFinish={isFinish}
                        onMouseDown={(row, col) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row, col) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseLeave={(row, col) =>
                          this.handleMouseLeave(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
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
    distance: Infinity,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isVisited: false,
    previousNode: null,
  };
};
