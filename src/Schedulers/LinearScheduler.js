import {ReadOnlyQueue, deferItem, runTimes} from '../common';

const nextTickKey = Symbol('nextTickKey');
const isTickPendingKey = Symbol('isTickPendingKey');

const itemsQueueKey = Symbol('itemsQueueKey');
const durationKey = Symbol('durationKey');

export class LinearScheduler {
  [nextTickKey];
  [isTickPendingKey];

  constructor({items = [], isCircular = false, duration = 5000}) {
    this[itemsQueueKey] = new ReadOnlyQueue(items, isCircular);
    this[durationKey] = duration;
  }

  get remainingItemsCount() {
    return this[itemsQueueKey].length;
  }

  get isTickPending() {
    return this[isTickPendingKey];
  }

  tick = async ({times = 1} = {}) => {
    this.cancelPendingTick();

    if (this.remainingItemsCount === 0) {
      this[isTickPendingKey] = false;
      return Promise.reject('Scheduler has no more items');
    }

    this[isTickPendingKey] = true;
    this[nextTickKey] = deferItem({
      duration: this[durationKey],
      item: runTimes(() => this[itemsQueueKey].dequeue(), times)
    });

    const resolvedItem = await this[nextTickKey].promise;
    this[isTickPendingKey] = false;
    return resolvedItem;
  };

  cancelPendingTick = () => {
    if (this[nextTickKey] && !this[nextTickKey].isResolved()) {
      this[nextTickKey].cancel();
    }
  }
}