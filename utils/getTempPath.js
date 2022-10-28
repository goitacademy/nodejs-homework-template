const path = require("path");

const getTempPath = (req) => {
	return path.join(__dirname, "../", "temp", req.file.originalname);
};

module.exports = getTempPath;
