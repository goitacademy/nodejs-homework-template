const path = require("path");

const getAvatarsPath = (fileName) => {
	return path.join(__dirname, "../", "public", "avatars", fileName);
};

module.exports = getAvatarsPath;
