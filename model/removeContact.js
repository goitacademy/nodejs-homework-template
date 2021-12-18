const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const removeContact = async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const removeContact = contacts.splice(idx, 1);
  await updateContacts(contacts);
  return removeContact;
};

module.exports = removeContact;
