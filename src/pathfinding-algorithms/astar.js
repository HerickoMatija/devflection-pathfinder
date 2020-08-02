import { getUnvisitedNeighbors } from "./common";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  const nodes = getAllNodesOnGrid(grid);

  while (nodes.length !== 0) {
    nodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);

    const closestNode = nodes.shift();

    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }

    updateNeighbourDistances(closestNode, grid, finishNode);
  }
}

function getAllNodesOnGrid(grid) {
  const allNodes = [];

  for (let row of grid) {
    for (let node of row) {
      allNodes.push(node);
    }
  }

  return allNodes;
}

function updateNeighbourDistances(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    const distanceToFinish = manhattanDistance(neighbor, finishNode);
    neighbor.distance = node.distance + 1 + distanceToFinish;
    neighbor.previousNode = node;
  }
}

function manhattanDistance(node, finishNode) {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}
