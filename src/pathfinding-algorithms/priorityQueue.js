export class PriorityQueue {
  constructor(getValueFunction, setValueFunction) {
    this._heap = [];
    this._map = new Map();
    this.getValueFunction = getValueFunction;
    this.setValueFunction = setValueFunction;
  }

  size() {
    return this._heap.length;
  }

  peek() {
    return this._heap[0];
  }

  push(node) {
    this._heap.push(node);
    this._map.set(mapNodeKey(node), this._heap.length - 1);
    this.siftUp(this._heap.length - 1);
  }

  pop() {
    this._swap(0, this._heap.length - 1);
    const toRemove = this._heap.pop();
    this._map.delete(mapNodeKey(toRemove));
    this.siftDown();
    return toRemove;
  }

  siftUp(startIdx) {
    let currentIdx = startIdx;
    let parentIdx = getParent(currentIdx);

    while (
      currentIdx !== 0 &&
      this._order(currentIdx) < this._order(parentIdx)
    ) {
      this._swap(currentIdx, parentIdx);
      currentIdx = parentIdx;
      parentIdx = getParent(currentIdx);
    }
  }

  siftDown() {
    let currentIdx = 0;
    let leftChildIdx = getLeftChild(currentIdx);

    while (leftChildIdx < this._heap.length) {
      let idxToSwap = leftChildIdx;

      let rightChildIdx = getRightChild(currentIdx);

      if (
        rightChildIdx < this._heap.length &&
        this._order(rightChildIdx) < this._order(leftChildIdx)
      ) {
        idxToSwap = rightChildIdx;
      }

      if (this._order(currentIdx) < this._order(idxToSwap)) {
        return;
      } else {
        this._swap(currentIdx, idxToSwap);
        currentIdx = idxToSwap;
        leftChildIdx = getLeftChild(currentIdx);
      }
    }
  }

  updateOrder(node, newDistance) {
    let currentIdx = this._map.get(mapNodeKey(node));
    this.setValueFunction(this._heap[currentIdx], newDistance);
    for (let idx = this._heap.length - 1; idx > 0; idx--) {
      this.siftUp(currentIdx);
    }
  }

  _order(idx) {
    return this.getValueFunction(this._heap[idx]);
  }

  _swap(idxOne, idxTwo) {
    const temp = this._heap[idxOne];
    this._heap[idxOne] = this._heap[idxTwo];
    this._heap[idxTwo] = temp;

    const nodeOne = this._heap[idxOne];
    const nodeTwo = this._heap[idxTwo];

    this._map.set(mapNodeKey(nodeOne), idxOne);
    this._map.set(mapNodeKey(nodeTwo), idxTwo);
  }
}

const getParent = (idx) => Math.floor((idx - 1) / 2);
const getLeftChild = (idx) => idx * 2 + 1;
const getRightChild = (idx) => idx * 2 + 2;

const mapNodeKey = (node) => node.row + "-" + node.col;
