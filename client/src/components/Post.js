const Post = ({ content }) => {
	return (
		<article className="w-80 border-border bg-cards rounded text-white p-4 border-2 hover:border-hoverBorder md:w-96 lg:w-120">
			<a href={`https://reddit.com${content.permalink}`} target="_blank" rel="noopener noreferrer">
				<div className="text-sm truncate">
					<h1>
						<a href={`https://reddit.com/r/${content.subreddit}`} target="_blank" rel="noopener noreferrer">
							r/{content.subreddit}
						</a>
					</h1>
					<div className="opacity-70">Posted by
						<a href={`https://reddit.com/user/${content.author}`} target="_blank" rel="noopener noreferrer"> u/{content.author}</a>
					</div>
				</div>
				<div className="max-w-max">
					<p className="pt-4 text-lg overflow-clip">{content.title}</p>
				</div>
			</a>
		</article>
	);
}

export default Post;
