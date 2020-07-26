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

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }
  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }
  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }
  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }

  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];

  let currentNode = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
