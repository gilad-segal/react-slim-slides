import {SyncScheduler} from './SyncScheduler';

describe('SyncScheduler', () => {
  it('should resolve ticks immediately', async () => {
    const scheduler = new SyncScheduler({items: [1]});
    const item = await scheduler.tick();
    expect(item).toEqual(1);
  });
});
