const validator = require("./validator.middleware");
const authenticate = require("./authenticate");
const upload = require("./upload.middleware");

module.exports = { validator, authenticate, upload };
