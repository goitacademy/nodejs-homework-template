const listContacts = require("./listContacts");
const updateContacts = require("./updateContact");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== contactId.toString());
  await updateContacts(newContacts);
    return contacts[index];
}

module.exports = removeContact;