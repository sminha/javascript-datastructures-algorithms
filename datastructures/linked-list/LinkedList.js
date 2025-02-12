import LinkedListNode from './LinkedListNode.js'
import Comparator from '../../utils/comparator/Comparator.js'

export default class LinkedList {
  constructor(comparatorFunction) {
    this.head = null
    this.tail = null

    this.compare = new Comparator(comparatorFunction)
  }

  prepend(value) {
    const newNode = new LinkedListNode(value, this.head)
    this.head = newNode

    if (!this.tail) {
        this.tail = newNode
    }

    return this
  }

  append(value) {
    const newNode = new LinkedListNode(value)

    if (!this.head) {
        this.head = newNode
        this.tail = newNode

        return this
    }

    this.tail.next = newNode
    this.tail = newNode

    return this
  }

  insert(value, rawIndex) {
    const index = rawIndex < 0 ? 0 : rawIndex

    if (index === 0) {
      this.prepend(value);
    } else {
      let count = 1
      let currentNode = this.head
      const newNode = new LinkedListNode(value)

      while(currentNode) {
        if (count === index) break
        currentNode = currentNode.next
        count += 1
      }

      if (currentNode) {
        newNode.next = currentNode.next
        currentNode.next = newNode
      } else {
        if (this.tail) {
          this.tail.next = newNode
          this.tail = newNode
        } else {
          this.head = newNode
          this.tail = newNode
        }
      }
    }
  }

  deleteHead() {
    if (!this.head) {
      return null
    }

    const deletedHead = this.head

    if (this.head.next) {
      this.head = this.head.next
    } else {
      this.head = null
      this.tail = null
    }

    return deletedHead
  }

  deleteTail() {
    const deletedTail = this.tail

    if (this.head === this.tail) {
      this.head = null
      this.tail = null

      return deletedTail
    }

    let currentNode = this.head

    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null
      } else {
        currentNode = currentNode.next
      }
    }

    this.tail = currentNode

    return deletedTail
  }

  delete(value) {
    if (!this.head) {
      return null
    }

    let deletedNode = null

    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head
      this.head = this.head.next
    }

    let currentNode = this.head

    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next
          currentNode.next = currentNode.next.next
        } else {
          currentNode = currentNode.next
        }
      }
    }

    if (this.compare.equal(this.tail.value, value)) {
      this.tail = currentNode;
    }

    return deletedNode
  }

  find({value = undefined, callback = undefined}) {
    if (!this.head) {
      return null
    }

    let currentNode = this.head

    while(currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode
      }

      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode
      }

      currentNode = currentNode.next
    }
    
    return null
  }

  reverse() {
    let currNode = this.head
    let prevNode = null
    let nextNode = null

    while (currNode) {
      nextNode = currNode.next

      currNode.next = prevNode

      prevNode = currNode
      currNode = nextNode
    }

    this.tail = this.head
    this.head = prevNode

    return this
  }

  fromArray(values) {
    values.forEach((value) => this.append(value))

    return this
  }

  toArray() {
    const nodes = []

    let currentNode = this.head

    while (currentNode) {
      nodes.push(currentNode)
      currentNode = currentNode.next
    }

    return nodes
  }

  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString()
  }
}