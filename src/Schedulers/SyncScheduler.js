import {LinearScheduler} from './LinearScheduler';

export class SyncScheduler extends LinearScheduler {
  constructor(params) {
    super({...params, duration: 0});
  }
}
