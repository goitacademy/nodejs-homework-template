const isBodyEmpty = require("./isBodyEmpty");
const isFavoriteEmpty = require("./isFavoriteEmpty")
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const authenticateToken = require("./authenticateToken");


module.exports = {
    isBodyEmpty,
    isFavoriteEmpty,
    isValidId,
    authenticate,
    authenticateToken,
}