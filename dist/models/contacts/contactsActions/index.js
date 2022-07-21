"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const listContacts_1 = require("./listContacts");
const getContactById_1 = require("./getContactById");
const addContact_1 = require("./addContact");
const deleteContactById_1 = require("./deleteContactById");
const updateContact_1 = require("./updateContact");
const contactsActions = {
    listContacts: listContacts_1.listContacts,
    getContactsById: getContactById_1.getContactsById,
    addContact: addContact_1.addContact,
    deleteContactById: deleteContactById_1.deleteContactById,
    updateContact: updateContact_1.updateContact
};
exports.default = contactsActions;
