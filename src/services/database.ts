import Dexie from 'dexie';

import { name } from '../../package.json';
import { TwitchUser, TwitchFollower } from './twitch.js';

export type UserId = TwitchUser['id'];

export type Follower = {
  date: TwitchFollower['followed_at'];
  name: TwitchFollower['from_name'];
  id: UserId;
};

class Database extends Dexie {
  readonly followers!: Dexie.Table<Follower, UserId>;
  readonly unfollowers!: Dexie.Table<Follower, UserId>;

  constructor() {
    super(`${name}.database`);

    // Fix for Dexie regarding https://github.com/babel/babel/issues/7644.
    for (const table of ['followers', 'unfollowers']) {
      delete (this as any)[table];
    }

    this.version(1).stores({
      followers: 'id,name,date',
      unfollowers: 'id,name,date'
    });
  }

  async resetTable<T extends {}>(
    table: Dexie.Table<T, any>,
    values: T[]
  ): Promise<any> {
    await table.clear();
    return table.bulkAdd(values);
  }

  getSortedValues<T extends {}>(
    table: Dexie.Table<T, any>
  ): Promise<T[]> {
    return table.orderBy('date').reverse().toArray();
  }

  clear(): Promise<void[]> {
    return Promise.all(this.tables.map(table => table.clear()));
  }
}

export const database: Database = new Database();
