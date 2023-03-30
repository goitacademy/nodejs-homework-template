const validationAddContact = require('./validation');
const validationUpDateContact = require('./validation');
const validationUpStatusContact = require('./validation');
const auth = require("./auth");
const upload = require('./upload');

module.exports = {
    validationAddContact,
    validationUpDateContact,
    validationUpStatusContact,
    auth,
    upload
};