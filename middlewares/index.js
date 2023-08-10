const validation = require("./validation");
const isValidId = require("./isValidId");
const isAmptyBody = require("./isAmptyBody");
const authenticate = require("./authenticate");
const upload = require("./upload");
const resize = require("./resize");
const isAmptyEmailField = require("./isAmptyEmailField");

	
module.exports = {
  validation,
  isValidId,
  isAmptyBody,
  authenticate,
	upload,
	resize,
	isAmptyEmailField,
};
