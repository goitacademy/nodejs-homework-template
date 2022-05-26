const listContacts = require("./listContacts");
const updateContactsDB = require("./updateContactsDB");

const updateContact = async (contactId, { name = null, email = null, phone = null }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const oldContact = { ...contacts[idx] };
  const newContact = {};

  if (name) {
    newContact.name = name;
  }
  if (email) {
    newContact.email = email;
  }
  if (phone) {
    newContact.phone = phone;
  }

  contacts[idx] = { ...oldContact, ...newContact };
  await updateContactsDB(contacts);
  return contacts[idx];
};

module.exports = updateContact;
