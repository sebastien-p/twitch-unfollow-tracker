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
  readonly unfollowers!: Dexie.Table<Follower, UserId>; // FIXME

  constructor() {
    super(`${name}.database`);

    this.version(1).stores({
      followers: 'id,name,date'
    });

    this.version(2).stores({ // FIXME
      unfollowers: 'id,name,date'
    });
  }

  private async resetTable<T extends {}>(
    table: Dexie.Table<T, any>,
    values: T[]
  ): Promise<any> {
    await table.clear();
    return table.bulkAdd(values);
  }

  private getTableValues<T extends {}>(
    table: Dexie.Table<T, any>
  ): Promise<T[]> {
    return table.orderBy('date').reverse().toArray();
  }

  clear(): Promise<void[]> {
    return Promise.all(this.tables.map(table => table.clear()));
  }

  resetFollowers(values: Follower[]): Promise<UserId> {
    return this.resetTable(this.table('followers'), values);
  }

  resetUnfollowers(values: Follower[]): Promise<UserId> {
    return this.resetTable(this.table('unfollowers'), values);
  }

  getFollowers(): Promise<Follower[]> {
    return this.getTableValues(this.table('followers'));
  }

  getUnfollowers(): Promise<Follower[]> {
    return this.getTableValues(this.table('unfollowers'));
  }
}

export const database: Database = new Database();
