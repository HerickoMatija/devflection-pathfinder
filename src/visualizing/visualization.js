export function animateSearch(visitedNodesInOrder, shortestPathInOrder) {
  for (let [index, node] of visitedNodesInOrder.entries()) {
    setTimeout(addCssClassToNode, 10 * index, node, "node-visited");
  }

  setTimeout(
    animateShortestPath,
    10 * visitedNodesInOrder.length,
    shortestPathInOrder
  );
}

function animateShortestPath(shortestPathInOrder) {
  for (let [index, node] of shortestPathInOrder.entries()) {
    setTimeout(addCssClassToNode, 25 * index, node, "node-shortest-path");
  }
}

function addCssClassToNode(node, cssClass) {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
}
