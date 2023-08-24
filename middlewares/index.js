const {validateBody, validateUpdateStatusContact} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate")

module.exports = {
    validateBody,
    isValidId,
    validateUpdateStatusContact,
    authenticate,
}