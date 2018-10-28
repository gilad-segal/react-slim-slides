import {RandomScheduler} from './RandomScheduler';

const drainScheduler = async scheduler => {
  const items = [];
  while (scheduler.remainingItemsCount > 0) {
    const item = await scheduler.tick();
    items.push(item);
  }
  return items;
};

describe('RandomScheduler', () => {
  it('should change items order', async () => {
    const wasShuffled = async () => {
      const scheduler = new RandomScheduler({
        items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        duration: 0
      });
      const shuffledItems = await drainScheduler(scheduler);
      try {
        expect(shuffledItems).not.toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        return 1;
      } catch {
        return 0;
      }
    };

    let wasShuffledCount = 0;
    for (let i = 0; i < 10; i++) {
      wasShuffledCount += await wasShuffled();
    }

    // test that the array was reordered atleast once
    expect(wasShuffledCount).toBeGreaterThan(0);
  });

  it('should start from a specific index', async () => {
    const scheduler = new RandomScheduler({
      items: [1, 2, 3, 4, 5],
      duration: 0,
      startIndex: 2
    });
    const item = await scheduler.tick();

    expect(item).toEqual(3);
  });
});
