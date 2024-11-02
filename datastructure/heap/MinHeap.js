import Heap from './Heap.js'

export default class MinHeap extends Heap {
  pairIsInCorrectOrder(firstElement, secondElement) {
    return this.compare.lessThanOrEqual(firstElement, secondElement)
  }
}