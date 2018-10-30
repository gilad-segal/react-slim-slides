import {sliceToStart, deferItem} from './utils';

describe('utils', () => {
  describe('sliceToStart', () => {
    it('should move items to the beginning of the array', () => {
      const arr = [1, 2, 3, 4, 5, 6, 7];
      expect(sliceToStart(arr, 3)).toEqual([4, 5, 6, 7, 1, 2, 3]);
    });

    it('should not change array when given moving the whole array', () => {
      const arr = [1, 2, 3, 4];
      expect(sliceToStart(arr, 0)).toEqual([1, 2, 3, 4]);
    });

    it('should not change array when start index is bigger then the array length', () => {
      const arr = [1, 2, 3, 4];
      expect(sliceToStart(arr, 10)).toEqual([1, 2, 3, 4]);
    });

    it('should not change array when start index is negative', () => {
      const arr = [1, 2, 3, 4];
      expect(sliceToStart(arr, -10)).toEqual([1, 2, 3, 4]);
    });
  });

  describe('deferItem', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.clearAllTimers();
    });

    it('should be resolved immediately if duration is zero', async () => {
      const {promise} = deferItem({duration: 0, item: 10});
      await expect(promise).resolves.toBe(10);
    });

    it('should be resolved with an item', async () => {
      const {promise} = deferItem({duration: 4000, item: 10});
      jest.advanceTimersByTime(4000);
      await expect(promise).resolves.toBe(10);
    });

    it('should be resolved with an item from callback', async () => {
      const {promise} = deferItem({duration: 4000, item: () => 10});
      jest.advanceTimersByTime(4000);
      await expect(promise).resolves.toBe(10);
    });

    it('should set resolved indication', async () => {
      const {isResolved} = deferItem({duration: 4000, item: () => 10});
      jest.advanceTimersByTime(2000);

      expect(isResolved()).toBe(false);
      jest.advanceTimersByTime(2000);
      expect(isResolved()).toBe(true);
    });

    it('should be rejected when cancel is called before duration has elapsed', async () => {
      const {promise, cancel} = deferItem({duration: 4000, item: () => 10});
      jest.advanceTimersByTime(2000);
      cancel();
      await expect(promise).rejects.toMatch(
        'deferred item promise was cancelled'
      );
    });

    it('should throw when cancel is called after duration has elapsed', () => {
      const {cancel} = deferItem({duration: 4000, item: 10});
      jest.advanceTimersByTime(4000);
      expect(() => cancel()).toThrow();
    });
  });
});
