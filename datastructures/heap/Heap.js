import Comparator from '../../utils/comparator/Comparator.js'

export default class Heap {
  constructor(comparatorFunction) {
    if (new.target === Heap) {
      throw new TypeError ('Cannot construct Heap instance directly')
    }

    this.heapContainer = []
    this.compare = new Comparator(comparatorFunction)
  }

  isEmpty() {
    return !this.heapContainer.length
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1 ) / 2)
  }

  getLeftChildIndex(parentIndex) {
    return (2 * parentIndex) + 1
  }

  getRightChildIndex(parentIndex) {
    return (2 * parentIndex) + 2
  }

  parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)]
  }

  leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)]
  }

  rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)]
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heapContainer.length
  }

  pairIsInCorrectOrder(firstElement, secondElement) {
    throw new Error(`You have to implement heap pair comparison method for ${firstElement} and ${secondElement} values.`)
  }

  find(item, comparator = this.compare) {
    const foundItemIndices = []

    for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++) {
      if (comparator.equal(item, this.heapContainer[itemIndex])) {
        foundItemIndices.push(itemIndex)
      }
    }

    return foundItemIndices
  }

  swap(firstIndex, secondIndex) {
    const tmp = this.heapContainer[secondIndex]
    this.heapContainer[secondIndex] = this.heapContainer[firstIndex]
    this.heapContainer[firstIndex] = tmp
  }

  heapifyUp(customStartIndex) {
    let currentIndex = customStartIndex || this.heapContainer.length - 1

    while (this.hasParent(currentIndex) && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
      this.swap(currentIndex, this.getParentIndex(currentIndex))
      currentIndex = this.getParentIndex(currentIndex)
    }
  }

  heapifyDown(customStartIndex = 0) {
    let currentIndex = customStartIndex
    let nextIndex = null

    while (this.hasLeftChild(currentIndex)) {
      if (this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
        nextIndex = this.getRightChildIndex(currentIndex)
      } else {
        nextIndex = this.getLeftChildIndex(currentIndex)
      }

      if (this.pairIsInCorrectOrder(this.heapContainer[currentIndex], this.heapContainer[nextIndex])) {
        break
      }

      this.swap(currentIndex, nextIndex)
      currentIndex = nextIndex
    }
  }

  peek() {
    if (this.heapContainer.length === 0) {
      return null
    }

    return this.heapContainer[0]
  }

  poll() {
    if (this.heapContainer.length === 0) {
      return null
    }

    if (this.heapContainer.length === 1) {
      return this.heapContainer.pop()
    }

    const item = this.heapContainer[0]

    this.heapContainer[0] = this.heapContainer.pop()
    this.heapifyDown();

    return item
  }

  add(item) {
    this.heapContainer.push(item)
    this.heapifyUp()

    return this
  }

  remove(item, comparator = this.compare) {
    const numberOfItemsToRemove = this.find(item, comparator).length

    for (let iteration = 0; iteration < numberOfItemsToRemove; iteration++) {
      const indexToRemove = this.find(item, comparator).pop()

      if (indexToRemove === this.heapContainer.length - 1) {
        this.heapContainer.pop()
      } else {
        this.heapContainer[indexToRemove] = this.heapContainer.pop()

        const parentItem = this.parent(indexToRemove)

        if (this.hasLeftChild(indexToRemove) && (!parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove]))) {
          this.heapifyDown(indexToRemove)
        } else {
          this.heapifyUp(indexToRemove)
        }
      }
    }

    return this
  }

  toString() {
    return this.heapContainer.toString()
  }
}