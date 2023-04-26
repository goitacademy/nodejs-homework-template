const addBodyValidator = require("./addBodyValidator");
const bodyValidator = require("./bodyValidator");
const isValidId = require("./isValidId");
const updateStatus = require("./updateStatus");
const authenticate = require("./authenticate");
const upload = require("./upload");
const uploadChecker = require("./uploadChecker");
module.exports = {
	uploadChecker,
	updateStatus,
	addBodyValidator,
	bodyValidator,
	isValidId,
	authenticate,
	upload,
};
