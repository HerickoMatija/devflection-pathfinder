import React, { Component } from "react";

import { bfs } from "../algorithms/bfs";
import { dfs } from "../algorithms/dfs";
import { rebuildShortestPathFromFinishNode } from "../algorithms/common";

import "./Pathfinder.css";

const Node = ({ row, col, type }) => {
  return <div id={`node-${row}-${col}`} className={`node ${type}`}></div>;
};

export default class Pathfinder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(this.props);
    this.setState({ grid });
  }

  visualizeBfs() {
    const { grid, startNode, finishNode } = this.initPathfinding();
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = rebuildShortestPathFromFinishNode(
      finishNode
    );
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDfs() {
    const { grid, startNode, finishNode } = this.initPathfinding();
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = rebuildShortestPathFromFinishNode(
      finishNode
    );
    this.animateSearch(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  initPathfinding() {
    const { startRow, startColumn, finishRow, finishColumn } = this.props;
    const { grid } = this.state;
    const startNode = grid[startRow][startColumn];
    const finishNode = grid[finishRow][finishColumn];

    return { grid, startNode, finishNode };
  }

  animateSearch(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      } else {
        setTimeout(() => {
          const node = visitedNodesInOrder[i];
          document.getElementById(`node-${node.row}-${node.col}`).className =
            "node node-visited";
        }, 10 * i);
      }
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-shortest-path";
      }, 50 * i);
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <div className="pathfinder-main">
        <button
          className="start-visualizing-button"
          onClick={() => this.visualizeBfs()}
        >
          Visualize BFS
        </button>

        <button
          className="start-visualizing-button"
          onClick={() => this.visualizeDfs()}
        >
          Visualize DFS
        </button>

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, type } = node;
                  return (
                    <Node key={nodeIdx} col={col} type={type} row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
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
