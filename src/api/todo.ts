/* ((ky, Dexie, _) => {
  'use strict';

  const userId = 122015139;
  const clientId = 'e100ogb2kvrm8frzn5e5phnyzj95if';
  const apiUrl = 'https://api.twitch.tv/helix/users/follows';

  const fetchFollowers = cursor => ky.get(apiUrl, {
    searchParams: { first: 100, to_id: userId, after: cursor },
    headers: { 'Client-ID': clientId }
  }).json();

  const toFollower = ({ from_id, from_name, followed_at }) => ({
    date: followed_at,
    name: from_name,
    id: from_id
  });

  const fetchAllFollowers = async (current = fetchFollowers('')) => {
    const { data, total, pagination: { cursor } } = await current;
    if (data.length >= total) { return data.map(toFollower); }
    const followers = await fetchFollowers(cursor);
    followers.data.push(...data);
    return fetchAllFollowers(followers);
  }

  const database = new Dexie('twitch.unfollowers.stats');

  database.version(1).stores({
    followers: 'id,name,date'
  });

  const button = document.querySelector('#fetch');

  button.addEventListener('click', async () => {
    const { followers } = database;

    // database.transaction('rw', [followers], async () => {
    const [old, current] = await Dexie.Promise.all([
      followers.toArray(),
      fetchAllFollowers()
    ]);

    console.log(old, current, _.differenceBy(old, current, ({ id }) => id));

    await followers.clear();
    return followers.bulkAdd(current);
    // }).catch(error => console.log(error));
  });

})(ky.default, Dexie, _)
 */
