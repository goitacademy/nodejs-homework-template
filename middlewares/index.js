const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const auth = require('./auth');
const upload = require('./upload');
const resize = require('./resize')
module.exports = {
    auth,
    validation,
    ctrlWrapper,
    upload,
    resize
}