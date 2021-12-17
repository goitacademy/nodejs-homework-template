const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function removeContact(contactId) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);
    if (contactIndex === -1) { return null; }
    const [removedContact] = contacts.splice(contactIndex, 1);
    await updateContacts(contacts);
    return removedContact;
  }

module.exports = removeContact;