const listContacts = require("./listContacts");
const updateContact = require("./updateContact");

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const idx = contacts.findIndex(e => e.id === contactId);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await updateContact(contacts);
  return removeContact;
};
module.exports = removeContact;
