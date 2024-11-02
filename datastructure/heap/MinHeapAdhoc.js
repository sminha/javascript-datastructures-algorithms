class MinHeapAdhoc {
  constructor(heap = []) {
    this.heap = []
    heap.forEach(this.add)
  }

  isEmpty() {
    return this.heap.length === 0
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2
  }

  leftChild(parentIndex) {
    return this.heap[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex) {
    return this.heap[this.getRightChildIndex(parentIndex)]
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length
  }

  swap(firstIndex, secondIndex) {
    const tmp = this.heap[secondIndex]
    this.heap[secondIndex] = this.heap[firstIndex]
    this.heap[firstIndex] = tmp
  }

  heapifyUp() {
    let nodeIndex = this.heap.length - 1

    while (nodeIndex > 0) {
      const parentIndex = this.getParentIndex(nodeIndex)

      if (this.heap[parentIndex] <= this.heap[nodeIndex]) {
        break
      }

      this.swap(parentIndex, nodeIndex)
      nodeIndex = parentIndex
    }
  }

  heapifyDown() {
    let nodeIndex = 0

    while((this.hasLeftChild(nodeIndex) && this.heap[nodeIndex] > this.leftChild(nodeIndex)) || this.hasRightChild(nodeIndex) && this.heap[nodeIndex] > this.rightChild(nodeIndex)) {
      const leftIndex = this.getLeftChildIndex(nodeIndex)
      const rightIndex = this.getRightChildIndex(nodeIndex)
      const left = this.leftChild(nodeIndex)
      const right = this.rightChild(nodeIndex)

      if (this.hasLeftChild(nodeIndex) && this.hasRightChild(nodeIndex)) {
        if (left <= right) {
          this.swap(leftIndex, nodeIndex)
          nodeIndex = leftIndex
        } else {
          this.swap(rightIndex, nodeIndex)
          nodeIndex = rightIndex
        }
      } else if (this.hasLeftChild(nodeIndex)) {
        this.swap(leftIndex, nodeIndex)
        nodeIndex = leftIndex
      }
    }
  }

  peek() {
    return this.heap[0]
  }

  poll() {
    if (this.heap.length === 0) {
      return undefined
    }

    const top = this.heap[0]

    this.heap[0] = this.heap[this.heap.length - 1]
    this.heap.pop()
    this.heapifyDown()

    return top
  }

  add(item) {
    this.heap.push(item)
    this.heapifyUp()
  }

  toString() {
    return this.heap.join(',')
  }
}

export default MinHeapAdhoc