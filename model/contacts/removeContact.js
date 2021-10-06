const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact (contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter(item => item.id !== contactId);
    await updateContacts(newContacts);
}

module.exports = removeContact;

