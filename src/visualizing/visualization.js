export function animateSearch(visitedNodesInOrder, shortestPathInOrder) {
  const animationTimers = [];

  for (let [index, node] of visitedNodesInOrder.entries()) {
    animationTimers.push(
      setTimeout(() => {
        addCssClassToNode(node, "node-visited");
      }, 10 * index)
    );
  }

  animationTimers.push(
    setTimeout(() => {
      animateShortestPath(shortestPathInOrder, animationTimers);
    }, 10 * visitedNodesInOrder.length)
  );

  return animationTimers;
}

function animateShortestPath(shortestPathInOrder, animationTimers) {
  for (let [index, node] of shortestPathInOrder.entries()) {
    animationTimers.push(
      setTimeout(() => {
        addCssClassToNode(node, "node-shortest-path");
      }, 25 * index)
    );
  }
}

function addCssClassToNode(node, cssClass) {
  const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
  nodeElement.className = `node ${cssClass}`;
}
