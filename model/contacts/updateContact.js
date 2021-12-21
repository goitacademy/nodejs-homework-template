const updateContactsList = require("./updateContactsList");
const listContacts = require("./listContacts");

const updateContact = async (contactId, body) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    contacts[idx] = { id: contactId, ...body };
    console.log(contacts[idx]);
    await updateContactsList(contacts);
    return contacts[idx];
}

module.exports = updateContact;

