import { getUnvisitedNeighbors } from "./common";

export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];

  const queue = [];
  queue.push(startNode);

  while (queue) {
    let current = queue.pop();
    visitedNodesInOrder.push(current);
    current.isVisited = true;

    if (current === finishNode) {
      return visitedNodesInOrder;
    }

    const unvisitedNeighbors = getUnvisitedNeighbors(current, grid);

    for (let unvisitedNeighbor of unvisitedNeighbors) {
      queue.push(unvisitedNeighbor);
      unvisitedNeighbor.previousNode = current;
    }
  }

  return visitedNodesInOrder;
}
