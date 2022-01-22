import axios from 'axios';
import { token } from '../utils';

const headers = {
	"Authorization": `Bearer ${token}`
};

const getUser = () => axios.get("https://oauth.reddit.com/api/v1/me", { headers });

const getFriend = () => axios.get("https://oauth.reddit.com/api/v1/me/friends", { headers });

const getSubs = () => axios.get("https://oauth.reddit.com/subreddits/mine/?limit=100", { headers });

const getTrophies = () => axios.get("https://oauth.reddit.com/api/v1/me/trophies", { headers });

const getBest = () => axios.get("https://oauth.reddit.com/best/?limit=100", { headers })

const getHot = () => axios.get("https://oauth.reddit.com/hot/?limit=100", { headers })

const getNew = () => axios.get("https://oauth.reddit.com/new/?limit=100", { headers })

const getTopSubs = () => axios.get("https://oauth.reddit.com/subreddits/popular", { headers })

export const getInfo = () => axios 
							.all([getUser(), getFriend(), getSubs(), getTrophies(), getBest(), getHot(), getNew(), getTopSubs()])
							.then(axios.spread((user, friends, subs, trophies, best, hot, newposts, topsubs) => ({
								user: user.data,
								friends: friends.data.data,
								subs: subs.data.data,
								trophies: trophies.data.data,
								best: best.data.data,
								hot: hot.data.data,
								newposts: newposts.data.data,
								topsubs: topsubs.data.data,
							})))