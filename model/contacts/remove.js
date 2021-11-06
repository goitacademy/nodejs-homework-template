const listContacts = require("./getAll");
const updateContacts = require("./updateDB");

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexContact = contacts.findIndex((el) => el.id === contactId);
  if (indexContact === -1) {
    return null;
  }
  const removeContact = contacts.splice(indexContact, 1);
  await updateContacts(contacts);
  return removeContact;
};

module.exports = removeContact;
