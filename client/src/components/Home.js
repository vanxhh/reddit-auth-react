import { useState } from 'react';
import Loader from './Loader';
import Post from './Post'

const Home = ({ best, hot, newposts, topsubs }) => {
	const [active, setActive] = useState('best');
	const posts = {
		'best': best,
		'hot': hot,
		'newposts': newposts,
	};

	const handleChange = (selected) => {
		setActive(selected);
	}

	const activeStyles = {
		backgroundColor: '#272729',
		borderRadius: '10px',
	};

	return (
		<>
		{topsubs && posts[active] ? 
			<div className="flex flex-row gap-x-4 justify-center">
				<div className="flex flex-col p-6 gap-y-6 items-center">
					<div className="flex gap-x-6">
						<h1
							className="text-white text-xl tracking-widest p-2 cursor-pointer"
							onClick={() =>  handleChange('best')}
							style={active === 'best' ? activeStyles : null}
						>
							Best
						</h1>
						<h1
							className="text-white text-xl tracking-widest p-2 cursor-pointer"
							onClick={() =>  handleChange('hot')}
							style={active === 'hot' ? activeStyles : null}
						>
							Hot
						</h1>
						<h1
							className="text-white text-xl tracking-widest p-2 cursor-pointer"
							onClick={() =>  handleChange('newposts')}
							style={active === 'newposts' ? activeStyles : null}
						>
							New
						</h1>
					</div>
					<div className="grid grid-rows-1 gap-y-4">
					{
						posts[active].children.map((post, index) => <Post key={index} content={post.data} />)
					}
					</div>
				</div>
				<div className="mt-23 mr-4 hidden text-white h-min md:flex flex-col bg-cards border-2 border-border rounded p-6 md:w-72">
					<h1 className="text-xl tracking-wide">Top Subreddits</h1>
					<div className="pt-4 flex flex-col gap-y-2">
						{
							topsubs.children.slice(0, 14).map((sub, index) => (
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
		</>
	);
}

export default Home;

