const {validateBody, validateUpdateStatusContact} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate")
const upload = require("./upload")

module.exports = {
    validateBody,
    isValidId,
    validateUpdateStatusContact,
    authenticate,
    upload,
}