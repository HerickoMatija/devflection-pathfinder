import { PriorityQueue } from "./priorityQueue";
import { getUnvisitedNeighbors } from "./common";

export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  startNode.distance = 0;
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

    updateNeighbourDistances(priorityQueue, closestNode, grid);
  }
}

function updateNeighbourDistances(priorityQueue, node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);

  for (const unvisitedNeighbor of unvisitedNeighbors) {
    priorityQueue.updateOrder(unvisitedNeighbor, node.distance + 1);
    unvisitedNeighbor.distance = node.distance + 1;
    unvisitedNeighbor.isVisited = true;
    unvisitedNeighbor.previousNode = node;
  }
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

const getValueFunction = (node) => node.distance;
const setValueFunction = (node, newValue) => (node.distance = newValue);
