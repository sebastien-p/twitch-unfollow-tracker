import ky from 'ky/umd';

export type AccessToken = string;
export type UserName = string;
export type UserId = string;

interface Response<T extends {}> {
  data: T[];
}

interface PaginatedResponse<T> extends Response<T> {
  total: number;
  pagination: {
    cursor: string;
  };
}

interface APIUser {
  preferred_username: UserName;
  sub: UserId;
}

interface APIFollower {
  followed_at: string;
  from_name: UserName;
  from_id: UserId;
}

export interface User {
  name: APIUser['preferred_username'];
  id: APIUser['sub'];
  token: AccessToken;
}

export interface Follower {
  date: APIFollower['followed_at'];
  name: APIFollower['from_name'];
  id: APIFollower['from_id'];
}

const clientId: string = 'e100ogb2kvrm8frzn5e5phnyzj95if';

async function get100Followers(
  token: AccessToken,
  userId: UserId,
  after: string = ''
): Promise<PaginatedResponse<Follower>> {
  const { data, ...response } = await ky
    .get(`https://api.twitch.tv/helix/users/follows`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Client-ID': clientId
      },
      searchParams: { after, first: 100, to_id: userId }
    })
    .json<PaginatedResponse<APIFollower>>();

  return {
    ...response,
    data: data.map(({ followed_at, from_name, from_id }) => ({
      date: followed_at,
      name: from_name,
      id: from_id
    }))
  };
}

export function getLoginURL(): string {
  const params: URLSearchParams = new URLSearchParams({
    claims: JSON.stringify({ id_token: { preferred_username: null } }),
    redirect_uri: window.location.origin,
    response_type: 'token id_token',
    client_id: clientId,
    scope: 'openid'
  });

  return `https://id.twitch.tv/oauth2/authorize?${params}`;
}

export function getLoggedInUser(): User | null {
  const params: URLSearchParams = new URLSearchParams(
    window.location.hash.replace(/^#+/, '')
  );

  const accessToken: string | null = params.get('access_token');
  const idToken: string | null = params.get('id_token');

  if (accessToken && idToken) {
    try {
      const { sub, preferred_username }: APIUser = JSON.parse(
        atob(idToken.split('.')[1])
      );

      if (sub && preferred_username) {
        return { name: preferred_username, id: sub, token: accessToken };
      }
    } catch (error) {}
  }

  return null;
}

export async function getFollowers(
  token: AccessToken,
  id: UserId,
  state: ReturnType<typeof get100Followers> = get100Followers(token, id)
): Promise<Follower[]> {
  const {
    data,
    total,
    pagination: { cursor }
  } = await state;

  if (data.length >= total) {
    return data;
  }

  return getFollowers(
    token,
    id,
    get100Followers(token, id, cursor).then(response => {
      response.data.push(...data);
      return response;
    })
  );
}

export function revokeToken(token: AccessToken): Promise<void> {
  return ky
    .post('https://id.twitch.tv/oauth2/revoke', {
      searchParams: { client_id: clientId, token }
    })
    .json<void>();
}
