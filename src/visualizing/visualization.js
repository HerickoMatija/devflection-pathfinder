export function animateSearch(
  visitedNodesInOrder,
  shortestPathInOrder,
  afterAnimationActions
) {
  for (let [index, node] of visitedNodesInOrder.entries()) {
    setTimeout(() => {
      addCssClassToNode(node, "node-visited");
    }, 10 * index);
  }

  setTimeout(() => {
    animateShortestPath(shortestPathInOrder, afterAnimationActions);
  }, 10 * visitedNodesInOrder.length);
}

function animateShortestPath(shortestPathInOrder, afterAnimationActions) {
  for (let [index, node] of shortestPathInOrder.entries()) {
    setTimeout(() => {
      addCssClassToNode(node, "node-shortest-path");
    }, 25 * index);
  }

  setTimeout(afterAnimationActions, 25 * shortestPathInOrder.length);
}

function addCssClassToNode(node, cssClass) {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
}
