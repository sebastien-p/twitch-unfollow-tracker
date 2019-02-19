import Dexie from 'dexie';
import { name } from '../../package.json';

import { TwitchUser, TwitchFollower } from './twitch.js';

export type UserId = TwitchUser['id'];

export interface Follower {
  date: TwitchFollower['followed_at'];
  name: TwitchFollower['from_name'];
  id: UserId;
};

class Database extends Dexie {
  readonly followers!: Dexie.Table<Follower, UserId>; // FIXME

  constructor() {
    super(`${name}.database`);

    this.version(1).stores({
      followers: 'id,name,date'
    });

    this.open();
  }

  async reset<T extends {}>(
    table: Dexie.Table<T, any>,
    values: T[]
  ): Dexie.Promise<any> {
    await table.clear();
    return table.bulkAdd(values);
  }
}

export const database: Database = new Database();
