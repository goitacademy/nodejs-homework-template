"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContact = void 0;
const updateContactList_1 = require("./helpers/updateContactList");
const uuid_1 = require("uuid");
const listContacts_1 = require("./listContacts");
const addContact = async ({ name, email, phone }) => {
    const contact = {
        id: (0, uuid_1.v4)(),
        name,
        email,
        phone,
    };
    const contacts = await (0, listContacts_1.listContacts)();
    //for the first element in data base
    if (!contacts) {
        const newList = [];
        newList.push(contact);
        (0, updateContactList_1.updateContactList)(newList);
        return contact;
    }
    contacts.push(contact);
    await (0, updateContactList_1.updateContactList)(contacts);
    return contact;
};
exports.addContact = addContact;
