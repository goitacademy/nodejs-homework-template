const validateBody = require("./validateBody");
const haveBody = require("./haveBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate")
const filesUploader = require("./filesUploader")

module.exports = {
    validateBody,
    haveBody,
    isValidId,
    authenticate,
    filesUploader,
}