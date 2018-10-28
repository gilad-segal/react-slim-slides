const itemsKey = Symbol('itemsKey');
const itemsIndex = Symbol('itemsIndex');
const isCircularKey = Symbol('isCircularKey');
const itemsRemoved = Symbol('itemsRemovedKey');

export class ReadOnlyQueue {
  [itemsRemoved] = 0;

  constructor(items = [], isCircular = false, startIndex = 0) {
    this[itemsKey] = items.slice();
    this[isCircularKey] = isCircular;
    this[itemsIndex] = startIndex;
  }

  dequeue() {
    if (this.isEmpty) {
      throw new QueueError('Cannot dequeue an empty queue');
    }

    if (!this[isCircularKey]) {
      this[itemsRemoved]++;
    }

    return this[itemsKey][this[itemsIndex]++ % this[itemsKey].length];
  }

  peek() {
    return this.isEmpty ? null : this[itemsKey][this[itemsIndex]];
  }

  get isEmpty() {
    return this[itemsKey].length === this[itemsRemoved];
  }

  get length() {
    return this[itemsKey].length - this[itemsRemoved];
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
