import React, { Component } from "react";

import { astar } from "../pathfinding-algorithms/astar";
import { bfs } from "../pathfinding-algorithms/bfs";
import { dfs } from "../pathfinding-algorithms/dfs";
import { dijkstra } from "../pathfinding-algorithms/dijkstra";
import { rebuildShortestPathFromFinishNode } from "../pathfinding-algorithms/common";
import { animateSearch } from "../visualizing/visualization";

import Node from "./node/Node";
import MenuBar from "../menu-bar/MenuBar";

import "./Pathfinder.css";

const A_STAR = "astar";
const BFS = "bfs";
const DFS = "dfs";
const DIJKSTRA = "dijkstra";

let START_NODE_ROW = 0;
let START_NODE_COL = 0;
let FINISH_NODE_ROW = 1;
let FINISH_NODE_COL = 1;

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

    if (animationTimers) {
      for (let animationTimer of animationTimers) {
        clearTimeout(animationTimer);
      }
    }

    const grid = getInitialGrid(window.innerWidth, window.innerHeight);
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];

    Promise.resolve().then(() => {
      this.setState({
        grid: [],
      });
    });

    Promise.resolve().then(() => {
      this.setState({
        grid,
        startNode,
        finishNode,
        animationTimers: null,
        buttonsEnabled: true,
      });
    });
  }

  visualize(selectedAlgorithm) {
    const { grid, startNode, finishNode } = this.state;

    let visitedNodesInOrder;
    if (selectedAlgorithm === A_STAR) {
      visitedNodesInOrder = astar(grid, startNode, finishNode);
    } else if (selectedAlgorithm === BFS) {
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

    if (node.isStart) {
      this.setState({ mouseIsPressed: true, movingNode: "start" });
    } else if (node.isFinish) {
      this.setState({ mouseIsPressed: true, movingNode: "finish" });
    } else {
      const newGrid = getGridWithCellWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;

    const node = this.state.grid[row][col];

    if (this.state.movingNode === "start") {
      node.isStart = true;
      this.setState({ startNode: node });
    } else if (this.state.movingNode === "finish") {
      node.isFinish = true;
      this.setState({ finishNode: node });
    } else {
      const newGrid = getGridWithCellWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid });
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
      this.setState({ startNode: node });
    } else if (this.state.movingNode === "finish") {
      node.isFinish = false;
      this.setState({ finishNode: node });
    }
  }

  render() {
    const { grid, buttonsEnabled } = this.state;

    return (
      <>
        <MenuBar
          astar={() => this.visualize(A_STAR)}
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
                    const { row, col, isStart, isFinish, isWall } = node;
                    return (
                      <Node
                        key={nodeIdx}
                        col={col}
                        row={row}
                        isStart={isStart}
                        isFinish={isFinish}
                        isWall={isWall}
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

  START_NODE_ROW = Math.floor(Math.random() * possibleRows);
  START_NODE_COL = Math.floor(Math.random() * possibleCols);

  FINISH_NODE_ROW = Math.floor(Math.random() * possibleRows);
  FINISH_NODE_COL = Math.floor(Math.random() * possibleCols);

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
    totalDistance: Infinity,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    isWall: false,
    isVisited: false,
    previousNode: null,
  };
};

const getGridWithCellWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
