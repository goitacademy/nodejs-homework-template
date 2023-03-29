const validationAddContact = require('./validation');
const validationUpDateContact = require('./validation');
const validationUpStatusContact = require('./validation');
const auth = require("./auth");

module.exports = {
    validationAddContact,
    validationUpDateContact,
    validationUpStatusContact,
    auth
};