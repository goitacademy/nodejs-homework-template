const checkID = require("./isValidId");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");
const sendEmai = require("./sendEmail");

module.exports = { checkID, validateBody, authenticate, upload, sendEmai };
