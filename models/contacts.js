const fs = require("fs/promises");

const listContacts = async () => {
  const file = await fs.open("models/contacts.json");
  const contacts = JSON.parse(await file.readFile());
  file.close();
  return contacts;
};

const getContactById = async (contactId) => {
  return (await listContacts()).find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
