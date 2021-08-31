const listContacts = require("./listContacts");
const toUpdateContacts = require("./toUpdateContacts");

const updateContact = async (contactId, updateData) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...contacts[idx], ...updateData };
  await toUpdateContacts(contacts);
  return contacts[idx];
};

module.exports = updateContact;
