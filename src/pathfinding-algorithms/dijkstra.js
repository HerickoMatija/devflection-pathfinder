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
    let weight = getNeighbourWeight(node, unvisitedNeighbor)

    priorityQueue.updateOrder(unvisitedNeighbor, node.distance + weight);
    unvisitedNeighbor.distance = node.distance + weight;
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

function getNeighbourWeight(node, neighbour) {
    if (node.row === neighbour.row) {
        return 5;
    }    
    if (node.row < neighbour.row) {
        return 1;
    }
    if (node.row > neighbour.row) {
        return 10;
    }
}

const getValueFunction = (node) => node.distance;
const setValueFunction = (node, newValue) => (node.distance = newValue);
