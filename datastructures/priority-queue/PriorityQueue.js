import MinHeap from '../heap/MinHeap.js'
import Comparator from '../../utils/comparator/Comparator.js'

export default class PriorityQueue extends MinHeap{
  constructor() {
    super()
    this.priorities = new Map()
    this.compare = new Comparator(this.comparePriority.bind(this))
  }

  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1
  }

  compareValue(a, b){
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

  add(item, priority) {
    this.priorities.set(item, priority)
    super.add(item)

    return this
  }

  remove(item, customFindingComparator) {
    this.priorities.delete(item)
    super.remove(item, customFindingComparator)

    return this
  }

  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue))
    this.add(item, priority)

    return this
  }

  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue))
  }

  hasValue(item) {
    return this.findByValue(item).length > 0
  }
}