const validation = require("./validation");
const ctrlWrapper = require("./controllerWrapper");
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
    validation,
    ctrlWrapper,
    authenticate,
    upload
}
