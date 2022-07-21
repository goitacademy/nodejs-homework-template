"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactById = void 0;
const listContacts_1 = require("./listContacts");
const updateContactList_1 = require("./helpers/updateContactList");
const deleteContactById = async (id) => {
    const contacts = await (0, listContacts_1.listContacts)();
    // data base empty
    if (!contacts) {
        return null;
    }
    const idx = contacts.findIndex((item) => item.id === id);
    if (idx === -1) {
        return null;
    }
    const [contactDeleted] = contacts.splice(idx, 1);
    await (0, updateContactList_1.updateContactList)(contacts);
    return contactDeleted;
};
exports.deleteContactById = deleteContactById;
