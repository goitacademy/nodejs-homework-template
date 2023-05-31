const validateBody = require("./validateBody");
const validateFavoriteStatus = require("./validateFavoriteStatus")
const isValidId = require("./isValidId");
const authenticate = require('./authenticate')

module.exports = {
    validateBody,
    validateFavoriteStatus,
    isValidId,
    authenticate
}