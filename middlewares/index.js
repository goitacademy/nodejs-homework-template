const addBodyValidator = require("./addBodyValidator");
const bodyValidator = require("./bodyValidator");
const isValidId = require("./isValidId");
const updateStatus = require("./updateFavoriteStatus");
const authenticate = require("./authenticate");
module.exports = { updateStatus, addBodyValidator, bodyValidator, isValidId, authenticate };
