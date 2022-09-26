const listContacts = require("./listContacts");
const rewriteJson = require("./rewriteJson");

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const removeContact = contacts.splice(index, 1);
  await rewriteJson(contacts);
  return removeContact;
};

module.exports = removeContact;
