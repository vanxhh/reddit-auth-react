import axios from "axios";

const EXPIRY = 3600 * 1000;

const getParams = () => {
    const params = {};
    let exe;
    const reg = /([^&;=]+)=?([^&;]*)/g;
    const loc = window.location.hash.substring(1);
    while ((exe = reg.exec(loc))) {
        params[exe[1]] = decodeURIComponent(exe[2]);
    }
    return params;
};

const setTokenTime = () => window.localStorage.setItem("reddit_access_time", Date.now());

const setLocalAccessToken = token => {
    setTokenTime();
    window.localStorage.setItem("reddit_access_token", token);
}

const setLocalRefreshToken = token => window.localStorage.setItem("reddit_refresh_token", token);

const getTokenTime = () => window.localStorage.getItem("reddit_access_time");

const getLocalAccessToken = () => window.localStorage.getItem("reddit_access_token");

const getLocalRefreshToken = () => window.localStorage.getItem("reddit_refresh_token");

const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
        return;
    }
    catch (err) {
        console.error(err);
    }
}

const getAccessToken = () => {
	const { error, access_token, refresh_token } = getParams();

	if (error) {
		console.log("Error!");
        refreshAccessToken();
	}

    if (Date.now() - getTokenTime() > EXPIRY) {
        console.warn("Access token expired, refreshing!");
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();

    if ((!localAccessToken || localAccessToken === "undefined") && (access_token !== "undefined")) {
        setLocalAccessToken(access_token);
        setLocalRefreshToken(refresh_token);
        return access_token;
    }

    return localAccessToken;
}

export const token = getAccessToken();
