const authenticate = require("./authenticate");
const isValidId = require("./isValidId");
const joiContactValidation = require("./joiContactValidation");
const joiAuthValidation = require("./joiAuthValidation");
const upload = require("./upload");

module.exports = {
    authenticate,
    isValidId,
    joiContactValidation,
    joiAuthValidation,
    upload,
};