/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getInfo } from './api';
import Home from './components/Home';
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { token } from './utils'

const App = () => {
	const [user, setUser] = useState(null)
	const [friends, setFriends] = useState(null)
	const [subs, setSubs] = useState(null)
	const [trophies, setTrophies] = useState(null)
	const [best, setBest] = useState(null)
	const [hot, setHot] = useState(null)
	const [newposts, setNewposts] = useState(null)
	const [topsubs, setTopsubs] = useState(null)
	const [loggedIn, setLoggedIn]  = useState('')

	useEffect(() => {
		const fetch = async () => {
			const { user, friends, subs, trophies, best, hot, newposts, topsubs } = await getInfo();
			setUser(user);
			setFriends(friends);
			setSubs(subs);
			setTrophies(trophies);
			setBest(best);
			setHot(hot);
			setNewposts(newposts);
			setTopsubs(topsubs);
		}

		fetch();

		setLoggedIn(token);
	}, [])

	return (
		<>
		{loggedIn ?
			<>
				<Navbar />
					<Routes>
					<Route path='/' element={<Home best={best} hot={hot} newposts={newposts} topsubs={topsubs} />} />
					<Route path='/profile' element={<Profile user={user} friends={friends} subs={subs} trophies={trophies} />} />
				</Routes>
			</> :
			<a href="/login" className="text-white">Login</a>
		}
		</>
	);
}

export default App;
