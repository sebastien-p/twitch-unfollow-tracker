import ky, { Options } from 'ky';
import differenceBy from 'lodash.differenceby';

import { UserId, Follower } from './database';

// TODO: handle errors

export interface TwitchUser {
  id: string;
  login: string;
}

export interface TwitchFollower {
  followed_at: string;
  from_id: TwitchUser['id'];
  from_name: TwitchUser['login'];
}

interface TwitchResponse<T extends {}> {
  data: T[];
}

interface TwitchPaginatedResponse<T> extends TwitchResponse<T> {
  total: number;
  pagination: {
    cursor: string;
  };
}

export type TwitchClientId = string;

function get<T, U extends TwitchResponse<T> = TwitchResponse<T>>(
  url: string,
  clientId: TwitchClientId,
  searchParams?: Options['searchParams']
): Promise<U> {
  return ky.get(
    `https://api.twitch.tv/helix/${url}`,
    { headers: { 'Client-ID': clientId }, searchParams }
  ).json<U>();
}

export async function getUserId(
  clientId: TwitchClientId,
  login: TwitchUser['login']
): Promise<UserId> {
  const { data: [user] } = await get<TwitchUser>('users', clientId, { login });
  return user && user.id;
}

function toFollower(
  { followed_at, from_name, from_id }: TwitchFollower
): Follower {
  return { date: followed_at, name: from_name, id: from_id };
}

async function get100Followers(
  clientId: TwitchClientId,
  to_id: UserId,
  cursor: string = ''
): Promise<TwitchPaginatedResponse<Follower>> {
  const {
    data,
    ...response
  } = await get<TwitchFollower, TwitchPaginatedResponse<TwitchFollower>>(
    'users/follows',
    clientId,
    { after: cursor, first: 100, to_id }
  );

  return { ...response, data: data.map(toFollower) };
}

export async function getFollowers(
  clientId: TwitchClientId,
  id: UserId,
  current: ReturnType<typeof get100Followers> = get100Followers(clientId, id)
): Promise<Follower[]> {
  const { data, total, pagination: { cursor } } = await current;
  if (data.length >= total) { return data; }

  const followers = await get100Followers(clientId, id, cursor);
  followers.data.push(...data);

  return getFollowers(clientId, id, Promise.resolve(followers));
}

export function getUnfollowers(
  previousList: Follower[],
  nextList: Follower[]
): Follower[] {
  return differenceBy(previousList, nextList, ({ id }) => id);
}
