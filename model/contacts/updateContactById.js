const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

async function updateContactById(contactId, contact) {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId.toString());
    if (contactIndex === -1 ) { return null; }
    contacts[contactIndex] = {...contact, id: contactId};
    await updateContacts(contacts);
    return contacts[contactIndex];
  }

module.exports = updateContactById;
