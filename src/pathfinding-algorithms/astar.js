import { PriorityQueue } from "./priorityQueue";
import { getUnvisitedNeighbors } from "./common";

export function astar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0;
  startNode.totalDistance = manhattanDistance(startNode, finishNode);
  const priorityQueue = createPriorityQueue(grid);

  while (priorityQueue.size() !== 0) {
    const closestNode = priorityQueue.pop();

    if (closestNode.distance === Infinity) {
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
    const totalDistance =
      node.distance + 1 + manhattanDistance(unvisitedNeighbor, finishNode);

    priorityQueue.updateOrder(unvisitedNeighbor, totalDistance);
    unvisitedNeighbor.distance = node.distance + 1;
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
