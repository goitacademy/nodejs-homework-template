const listContacts = require("./listContacts");
const updateContactsBase = require("./updateContactsBase");

const changeContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;

  contacts[index] = { id, ...data };
  console.log(contacts[index]);
  await updateContactsBase(contacts);
  return contacts[index];
};

module.exports = changeContact;
