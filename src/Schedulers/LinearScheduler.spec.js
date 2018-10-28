import {LinearScheduler} from './LinearScheduler';

describe('LinearScheduler', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should maintain items length', () => {
    const scheduler = new LinearScheduler({items: [1, 2, 3, 4]});
    expect(scheduler.remainingItemsCount).toEqual(4);
  });

  it('should be circular', async () => {
    const scheduler = new LinearScheduler({
      items: [1, 2],
      duration: 0,
      isCircular: true
    });
    await scheduler.tick();
    await scheduler.tick();
    const thirdItem = await scheduler.tick();

    expect(thirdItem).toEqual(1);
  });

  describe('timing mechanism', () => {
    it('should have a pending tick', () => {
      const scheduler = new LinearScheduler({items: [1, 2], duration: 200});
      scheduler.tick();
      expect(scheduler.isTickPending).toEqual(true);
    });

    it('should not have pending tick after tick was resolved', async () => {
      const scheduler = new LinearScheduler({items: [1, 2], duration: 200});
      const tick = scheduler.tick();
      jest.advanceTimersByTime(200);
      await tick;

      expect(scheduler.isTickPending).toEqual(false);
    });

    it('should resolve an item after duration has elapsed', async () => {
      const scheduler = new LinearScheduler({items: [1], duration: 200});
      const tick = scheduler.tick();
      jest.advanceTimersByTime(200);
      await expect(tick).resolves.toBe(1);
    });

    it('should remove an item when tick is scheduled', () => {
      const scheduler = new LinearScheduler({items: [1, 2], duration: 200});
      scheduler.tick();
      expect(scheduler.remainingItemsCount).toEqual(1);
    });

    it('should reject tick when there are no items left', async () => {
      const scheduler = new LinearScheduler({items: []});
      await expect(scheduler.tick()).rejects.toEqual(
        'Scheduler has no more items'
      );
    });

    it('should reject previous pending tick when another tick is scheduled', async () => {
      const scheduler = new LinearScheduler({items: [1, 2, 3]});

      const previousTick = scheduler.tick();
      scheduler.tick();

      await expect(previousTick).rejects.toEqual(
        'deferred item promise was cancelled'
      );
    });
  });
});
