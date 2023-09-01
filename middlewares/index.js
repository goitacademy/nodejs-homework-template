const validateBody = require("./validateBody");
const isValidId = require("../middlewares/isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
    validateBody,
    isValidId,
    authenticate,
    upload,
}