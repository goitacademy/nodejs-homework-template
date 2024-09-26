const validateBody = require("./validateBody");
const validateFavoriteStatus = require("./validateFavoriteStatus")
const isValidId = require("./isValidId");
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
    validateBody,
    validateFavoriteStatus,
    isValidId,
    authenticate,
    upload,
}