import Comparator from '../../utils/comparator/Comparator.js'

export default class Sort {
  constructor(originalCallback) {
    this.callbacks = Sort.initSortingCallbacks(originalCallback)
    this.comparator = new Comparator(this.callbacks.compareCallback)
  }

  static initSortingCallbacks(originalCallback) {
    const callbacks = originalCallback || {}
    const stubCallback = () => {}

    callbacks.compareCallback = callbacks.compareCallback || undefined
    callbacks.visitingCallback = callbacks.visitingCallback || stubCallback

    return callbacks
  }

  sort () {
    throw new Error('sort method must be implemented')
  }
}