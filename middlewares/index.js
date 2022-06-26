const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require('./auth');
const upload = require('./upload');
module.exports = {
    auth,
    validation,
    ctrlWrapper,
    upload
}