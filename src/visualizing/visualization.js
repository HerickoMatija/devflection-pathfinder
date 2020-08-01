export function animateSearch(
  visitedNodesInOrder,
  shortestPathInOrder,
  beforeAnimationActions,
  afterAnimationActions
) {
  beforeAnimationActions();

  for (let [index, node] of visitedNodesInOrder.entries()) {
    setTimeout(addCssClassToNode, 10 * index, node, "node-visited");
  }

  setTimeout(
    animateShortestPath,
    10 * visitedNodesInOrder.length,
    shortestPathInOrder,
    afterAnimationActions
  );
}

function animateShortestPath(shortestPathInOrder, afterAnimationActions) {
  for (let [index, node] of shortestPathInOrder.entries()) {
    setTimeout(addCssClassToNode, 25 * index, node, "node-shortest-path");
  }
  setTimeout(afterAnimationActions, 25 * shortestPathInOrder.length);
}

function addCssClassToNode(node, cssClass) {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
}
