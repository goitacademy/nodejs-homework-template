const { updateContactService } = require("./updateContactService");
const { removeContactService } = require("./removeContactService");
const { createContactService } = require("./createContactService");
const { getContactService } = require("./getContactService");
const { getContactsService } = require("./getContactsService");
const { updateStatusContactService } = require("./updateStatusContactService");

module.exports = {
    updateContactService,
    removeContactService,
    createContactService,
    getContactService,
    getContactsService,
    updateStatusContactService,
};