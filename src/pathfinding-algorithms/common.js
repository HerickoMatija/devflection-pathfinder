export function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (col > 0) {
    const neighbor = grid[row][col - 1];
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbors.push(neighbor);
    }
  }
  if (row > 0) {
    const neighbor = grid[row - 1][col];
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbors.push(neighbor);
    }
  }
  if (col < grid[0].length - 1) {
    const neighbor = grid[row][col + 1];
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbors.push(neighbor);
    }
  }
  if (row < grid.length - 1) {
    const neighbor = grid[row + 1][col];
    if (!neighbor.isVisited && !neighbor.isWall) {
      neighbors.push(neighbor);
    }
  }

  return neighbors;
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
