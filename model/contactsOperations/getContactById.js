const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id == contactId);
  if (idx === -1) {
    return null;
  }
  return contacts[idx];
};

module.exports = getContactById;
