const itemsKey = Symbol('itemsKey');
const itemsIndex = Symbol('itemsIndex');
const isCircularKey = Symbol('isCircularKey');
const itemsRemoved = Symbol('itemsRemovedKey');

export class ReadOnlyQueue {
  [itemsIndex] = 0;

  constructor(items = [], isCircular = false) {
    this[itemsKey] = items.slice();
    this[isCircularKey] = isCircular;
  }

  dequeue() {
    if (this.isEmpty) {
      throw new QueueError('Cannot dequeue an empty queue');
    }

    return this[itemsKey][this[itemsIndex]++ % this[itemsKey].length];
  }

  restoreItems(count) {
    if (count < 0) { // add test here
      count = 0;
    }

    if (this[isCircularKey]) { // add test for huge numbers
      count = count % this[itemsKey].length;
    }

    if (this[itemsIndex] - count < 0) { // add test for exception
      throw new QueueError('Tried to restore non existing item')
    }

    this[itemsIndex] -= count;
    
    if (this[itemsIndex] < 0) { // does this work?
      this[itemsIndex] = this[itemsIndex].length - this[itemsIndex];
    }
  }

  peek() {
    return this.isEmpty ? null : this[itemsKey][this[itemsIndex]];
  }

  get isEmpty() {
    if (this[isCircularKey]) {
      return this[itemsKey].length === 0; 
    }

    return this[itemsKey].length === this[itemsIndex];
  }

  get length() {
    if (this[isCircularKey]) {
      return this[itemsKey].length;
    }

    return this[itemsKey].length - this[itemsIndex];
  }
}

export class QueueError extends Error {
  constructor(...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, QueueError);
    }
  }
}
