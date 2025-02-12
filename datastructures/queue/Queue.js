import LinkedList from '../linked-list/LinkedList.js'

export default class Queue {
  constructor() {
    this.linkedList = new LinkedList()
  }

  isEmpty() {
    return !this.linkedList.head
  }

  peek() {
    if (this.isEmpty()) {
      return null
    }

    return this.linkedList.head.value
  }

  enqueue(value) {
    this.linkedList.append(value)
  }

  dequeue() {
    const removedHead = this.linkedList.deleteHead()
    return removedHead ? removedHead.value : null
  }

  toString(callback) {
    return this.linkedList.toString(callback)
  }
}