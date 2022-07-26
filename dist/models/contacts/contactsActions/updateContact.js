"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContact = void 0;
const listContacts_1 = require("./listContacts");
const updateContactList_1 = require("./helpers/updateContactList");
const updateContact = async (id, { name, email, phone }) => {
    const contacts = await (0, listContacts_1.listContacts)();
    // empty Data Base
    if (!contacts) {
        return null;
    }
    const idx = contacts.findIndex(item => item.id === id);
    //no contact with searched id in the Data Base
    if (idx === -1) {
        return null;
    }
    contacts[idx] = {
        ...contacts[idx],
        name,
        email,
        phone,
    };
    await (0, updateContactList_1.updateContactList)(contacts);
    return contacts[idx];
};
exports.updateContact = updateContact;
