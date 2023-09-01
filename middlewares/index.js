const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const errorHandler = require("./errorHandler");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
    validateBody,
    isValidId,
    errorHandler,
    authenticate,
    upload,
}