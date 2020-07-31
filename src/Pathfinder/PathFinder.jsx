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
    const grid = getInitialGrid(this.props);
    this.setState({ grid });
  }

  resetBoard() {
    Promise.resolve().then(() => {
      this.setState({ grid: [], animating: false, done: false });
    });

    const grid = getInitialGrid(this.props);

    Promise.resolve().then(() => {
      this.setState({ grid: grid });
    });
  }

  visualizeBfs() {
    Promise.resolve().then(() => {
      this.setState({ animating: true });
    });

    const { grid, startNode, finishNode } = this.initPathfinding();

    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    this.animateSearch(visitedNodesInOrder, shortestPathInOrder);
  }

  visualizeDfs() {
    Promise.resolve().then(() => {
      this.setState({ animating: true });
    });

    const { grid, startNode, finishNode } = this.initPathfinding();

    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const shortestPathInOrder = rebuildShortestPathFromFinishNode(finishNode);

    this.animateSearch(visitedNodesInOrder, shortestPathInOrder);
  }

  initPathfinding() {
    const { startRow, startColumn, finishRow, finishColumn } = this.props;
    const { grid } = this.state;
    const startNode = grid[startRow][startColumn];
    const finishNode = grid[finishRow][finishColumn];

    return { grid, startNode, finishNode };
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
        <div class="menu-container">
          <div class="menu">
            <button
              class="menu-button"
              disabled={this.state.animating || this.state.done}
              onClick={() => this.visualizeBfs()}
            >
              Visualize BFS
            </button>
            <button
              class="menu-button"
              disabled={this.state.animating || this.state.done}
              onClick={() => this.visualizeDfs()}
            >
              Visualize DFS
            </button>
            <button
              class="menu-button"
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

const getInitialGrid = ({
  rows,
  cols,
  startRow,
  startColumn,
  finishRow,
  finishColumn,
}) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(
        createNode(col, row, startRow, startColumn, finishRow, finishColumn)
      );
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (
  col,
  row,
  startRow,
  startColumn,
  finishRow,
  finishColumn
) => {
  let type = "node";

  if (row === startRow && col === startColumn) {
    type = "node-start";
  }

  if (row === finishRow && col === finishColumn) {
    type = "node-finish";
  }

  return {
    col,
    row,
    type: type,
    isVisited: false,
    previousNode: null,
  };
};

const addCssClassToNode = (node, cssClass) => {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
};

const Node = ({ row, col, type }) => {
  return <div id={`node-${row}-${col}`} className={`node ${type}`}></div>;
};
