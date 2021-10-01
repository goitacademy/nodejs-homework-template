const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function updateContact(contactId, data) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const updateContact = { ...contacts[idx], ...data };
    contacts[idx] = updateContact;
    await updateContacts(contacts);
    return updateContact;
};

module.exports = updateContact;