import { PriorityQueue } from "./priorityQueue";
import { getUnvisitedNeighbors } from "./common";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.totalDistance = 0;
  const priorityQueue = createPriorityQueue(grid);

  while (priorityQueue.size() !== 0) {
    const closestNode = priorityQueue.pop();

    if (closestNode.totalDistance === Infinity) {
      return visitedNodesInOrder;
    }

    closestNode.isVisited = true;

    visitedNodesInOrder.push(closestNode);

    if (closestNode === finishNode) {
      return visitedNodesInOrder;
    }

    updateNeighbourDistances(priorityQueue, closestNode, grid, finishNode);
  }
}

function updateNeighbourDistances(priorityQueue, node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const unvisitedNeighbor of unvisitedNeighbors) {
    const totalDistance = manhattanDistance(unvisitedNeighbor, finishNode);

    priorityQueue.updateOrder(unvisitedNeighbor, totalDistance);
    unvisitedNeighbor.totalDistance = totalDistance;
    unvisitedNeighbor.previousNode = node;
  }
}

function manhattanDistance(node, finishNode) {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
}

function createPriorityQueue(grid) {
  const priorityQueue = new PriorityQueue(getValueFunction, setValueFunction);

  for (let row of grid) {
    for (let node of row) {
      priorityQueue.push(node);
    }
  }

  return priorityQueue;
}

const getValueFunction = (node) => node.totalDistance;
const setValueFunction = (node, newValue) => (node.totalDistance = newValue);
