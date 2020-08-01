export function animateSearch(visitedNodesInOrder, shortestPathInOrder) {
  for (let [index, node] of visitedNodesInOrder.entries()) {
    setTimeout(() => addCssClassToNode(node, "node-visited"), 10 * index);
  }

  setTimeout(
    () => animateShortestPath(shortestPathInOrder),
    10 * visitedNodesInOrder.length
  );
}

function animateShortestPath(shortestPathInOrder) {
  for (let [index, node] of shortestPathInOrder.entries()) {
    setTimeout(() => addCssClassToNode(node, "node-shortest-path"), 25 * index);
  }
}

function addCssClassToNode(node, cssClass) {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
}
