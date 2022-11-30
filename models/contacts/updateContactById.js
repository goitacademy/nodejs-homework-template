const listContacts = require("./listContacts");
const updateContacts = require("./updateContact");

const updateContactById = async (contactId, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...data, contactId };
  await updateContacts(contacts);
  return contacts[index];
}

module.exports = updateContactById;