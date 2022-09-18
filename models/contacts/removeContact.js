const listContacts = require("./listContacts");
const updateContactsBase = require("./updateContactsBase");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => contactId === id);
  if (index === -1) return null;

  const [deletedContact] = contacts.splice(index, 1);
  updateContactsBase(contacts);
  return deletedContact;
};

module.exports = removeContact;
