export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function rebuildShortestPathFromFinishNode(finishNode) {
  const nodesInShortestPathOrder = [];

  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
