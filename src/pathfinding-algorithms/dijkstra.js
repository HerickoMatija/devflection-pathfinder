import { getUnvisitedNeighbors } from "./common";

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  const nodes = getAllNodesOnGrid(grid);

  while (nodes.length != 0) {
    nodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);

    const closestNode = unvisitedNodes.shift();

    if (closestNode.distance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }

    updateNeighbourDistances(closest, grid);
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

function updateNeighbourDistances(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}
