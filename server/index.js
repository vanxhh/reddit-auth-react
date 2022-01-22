require('dotenv').config()

const REDIRECT_URI = process.env.REDIRECT_URI;
const FRONTEND_URI = process.env.FRONTEND_URI;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const PORT = process.env.PORT;

const path = require("path");
const express = require("express");
const querystring = require("query-string");
const request = require("request");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const { query } = require("express");

const app = express();

const generateRandomString = len => {
	let text = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	
	for (let i = 0; i < len; ++i) {
		text += characters.charAt(Math.floor(Math.random() * characters.length));
	}

	return text;
}

const stateKey = "reddit_auth_state";

app
	.use(express.static(path.resolve(__dirname, "../client/build")))
	.use(cors())
	.use(cookieparser());

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

app.get("/login", (req, res) => {
	const state = generateRandomString(16);
	res.cookie(stateKey, state);

	const scope = "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread";
	
	res.redirect(`https://www.reddit.com/api/v1/authorize?${querystring.stringify({
		client_id: CLIENT_ID,
		response_type: 'code',
		state: state,
		redirect_uri: REDIRECT_URI,
		duration: 'permanent',
		scope: scope
	})}`);
})

app.get("/callback", (req, res) => {
	const { error, code, state } = req.query;
	const storedState = req.cookies ? req.cookies[stateKey] : null;

	if (state === null || state !== storedState) {
		res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
	}
	else {
		res.clearCookie(stateKey);

		const authOptions = {
			url: "https://www.reddit.com/api/v1/access_token",
			form: {
				grant_type: "authorization_code",
				code: code,
				redirect_uri: REDIRECT_URI
			},
			headers: {
				Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
                    'base64',
                )}`,
			},
			json: true
		}

		request.post(authOptions, (error, response, body) => {
			if (!error && response.statusCode === 200) {
				const { access_token, refresh_token } = body;

				res.redirect(`${FRONTEND_URI}/#${querystring.stringify({
					access_token, refresh_token
				})}`)
			}
			else {
				res.redirect("/");
			}
		})
	}
})

app.get("/refresh_token", (req, res) => {
	const refresh_token = req.query.refresh_token;

	const authOptions = {
		url: "https://www.reddit.com/api/v1/access_token",
		form: {
			grant_type: "authorization_code",
			redirect_uri: REDIRECT_URI
		},
		headers: {
			Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
				'base64',
			)}`,
		},
		json: true
	}

	request.post(authOptions, (error, response, body) => {
		if (!error && response.statusCode === 200) {
			const access_token = body.access_token;

			res.send({ 'access_token': access_token });
		}
	})
})

app.get("*", (req, res) => {
	console.log(window.localStorage.getItem("reddit_access_token"));
	res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
})

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
})
