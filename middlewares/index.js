const validation = require("./validation");
const controllerWrapper = require("./controllerWrapper");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
	validation,
	controllerWrapper,
	isValidId,
	auth,
	upload,
};
