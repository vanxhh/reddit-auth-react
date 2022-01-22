/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import Loader from './Loader';

const Profile = ({ user, friends, subs, trophies }) => {
	return (
		<div className="flex justify-center p-6">
			{(user && friends && subs && trophies) ?
			<div className="flex flex-col gap-6 md:flex-row">
				<div className="flex flex-col gap-6">
					<div className="text-white h-max w-64 flex flex-col justify-center items-center bg-cards border-2 border-border rounded gap-y-6 p-6 md:w-72">
						<div className="flex flex-col gap-y-1 items-center">
							<div>
								<img src={user.snoovatar_img} alt="snoo" className="h-42 w-28" />
							</div>
							<a href={`https://reddit.com/user/${user.name}`} target="_blank" rel="noopener noreferrer"><div className='tracking-widest text-xl font-medium'>{user.name}</div></a>
						</div>
						<div className="flex gap-x-10">
							<div>
								<div className="tracking-widest">Karma</div>
								<div className="font-thin leading-3 pt-1">{user.total_karma}</div>
							</div>
							<div>
								<div className="tracking-widest">Followers</div>
								<div className="font-thin leading-3 pt-1">{friends.children.length}</div>
							</div>
						</div>
					</div>
					<div className="text-white h-max w-64 flex flex-col justify-center bg-cards border-2 border-border rounded gap-y-6 p-6 md:w-72">
						<h1 className="text-xl tracking-wide">Trophy Case - {trophies.trophies.length}</h1>
						<div className="pt-4 flex flex-col gap-y-2">
						{
							trophies.trophies.map((trophy, index) => (
								<div className="flex flex-col gap-y-1" key={index}>
									<article className="flex flex-row gap-x-2 items-center">
										<img src={trophy.data.icon_70} alt="trophy" className="h-12 w-12" />
										<span className="truncate">{trophy.data.name}</span>
									</article>
									<div className="h-px bg-border"></div>
								</div>
							))
						}
					</div>
					</div>
				</div>
				<div className="text-white w-64 flex flex-col bg-cards border-2 border-border rounded p-6 md:w-72">
					<h1 className="text-xl tracking-wide">Subreddits</h1>
					<div className="pt-4 flex flex-col gap-y-2">
						{
							subs.children.slice(0, 14).map((sub, index) => (
								<div className="flex flex-col gap-y-1" key={index}>
									<a href={`https://reddit.com${sub.data.url}`} className="truncate" target="_blank" rel="noopener noreferrer">{sub.data.display_name_prefixed}</a>
									<div className="h-px bg-border"></div>
								</div>
							))
						}
					</div>
				</div>
			</div> :
			<Loader />
			}
		</div>
	);
}

export default Profile;

