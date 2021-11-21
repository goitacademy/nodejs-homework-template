/* eslint-disable semi */
/* eslint-disable quotes */
const listContacts = require("./listContacts");
const updateListContacts = require("./updateListContacts");

// removeContact - удалить контакт.
const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(
    // (contact) => contact.id === Number(contactId)
    (contact) => String(contact.id) === contactId
  );
  if (idx === -1) {
    return null;
  }
  const newContact = allContacts.filter((_, index) => index !== idx);
  await updateListContacts(newContact);
  return allContacts[idx];
};

module.exports = removeContact;
