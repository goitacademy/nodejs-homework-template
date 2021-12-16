const listContacts = require("./listContacts");
const updateContact = require("./updateContact");

const updateContactById = async (contactId, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(e => e.id == contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = {...data, contactId};
  await updateContact(contacts);
  return contacts[idx];
};

module.exports = updateContactById;