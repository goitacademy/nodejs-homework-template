const validation = require("./validation");
const { checkAuth } = require("./checkAuth");
const ctrlWrapper = require("./ctrlWrapper");
const upload = require('./upload');

module.exports = { validation, checkAuth, ctrlWrapper, upload };