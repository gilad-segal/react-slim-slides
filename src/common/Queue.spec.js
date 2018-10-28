import {ReadOnlyQueue} from './Queue';

describe('ReadOnlyQueue', () => {
  it('should be empty', () => {
    debugger;
    const queue = new ReadOnlyQueue([]);
    expect(queue.isEmpty).toEqual(true);
  });

  it('should not be empty', () => {
    const queue = new ReadOnlyQueue([1, 2, 3, 4]);
    expect(queue.isEmpty).toEqual(false);
  });

  it('should maintain proper length', () => {
    const queue = new ReadOnlyQueue([1, 2, 3, 4]);
    expect(queue.length).toEqual(4);
  });

  it('should return the head of the queue', () => {
    const queue = new ReadOnlyQueue([4, 3, 2, 1]);
    expect(queue.peek()).toEqual(4);
  });

  it('should return null as the head of an empty queue', () => {
    const queue = new ReadOnlyQueue([]);
    expect(queue.peek()).toEqual(null);
  });

  it('should dequeue an item', () => {
    const queue = new ReadOnlyQueue([3, 2, 1]);
    const item = queue.dequeue();

    expect(item).toEqual(3);
    expect(queue.length).toEqual(2);
  });

  it('should throw when dequeuing an empty queue', () => {
    const queue = new ReadOnlyQueue([]);
    expect(() => queue.dequeue()).toThrow();
  });

  it('should have the same length when queue is circular', () => {
    const queue = new ReadOnlyQueue([1, 2, 3], true);
    queue.dequeue();
    expect(queue.length).toEqual(3);
  });
});
