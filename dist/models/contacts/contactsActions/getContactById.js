"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactsById = void 0;
const listContacts_1 = require("./listContacts");
const getContactsById = async (id) => {
    const contactList = await (0, listContacts_1.listContacts)();
    if (!contactList) {
        return null;
    }
    const result = contactList.find(item => item.id === id);
    if (!result) {
        return null;
    }
    return result;
};
exports.getContactsById = getContactsById;
