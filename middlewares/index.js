const validateBody = require("./validateBody");
const validateId = require("./validateId");
const auth = require('./auth');
const upload = require('./upload')

module.exports = {
    validateBody,
    validateId,
    auth,
    upload
}