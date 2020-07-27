import { getUnvisitedNeighbors } from "./common";

export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  const queue = [];
  queue.push(startNode);

  while (queue) {
    let current = queue.shift();
    visitedNodesInOrder.push(current);
    current.isVisited = true;

    if (current === finishNode) {
      return visitedNodesInOrder;
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);

    for (let unvisitedNeighbor of unvisitedNeighbors) {
      queue.push(unvisitedNeighbor);
      unvisitedNeighbor.isVisited = true;
      unvisitedNeighbor.previousNode = current;
    }
  }

  return visitedNodesInOrder;
}
