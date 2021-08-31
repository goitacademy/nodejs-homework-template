const listContacts = require("./listContacts");
const toUpdateContacts = require("./toUpdateContacts");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const id = +contactId;
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((contact) => contact.id !== id);
  await toUpdateContacts(newContacts);
  return contacts[idx];
};

module.exports = removeContact;
