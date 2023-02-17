const path = require('path');
const fs = require('fs/promises');

const pathContacts = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  return await fs.readFile(pathContacts, 'utf8');
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactsArray = JSON.parse(contacts);
  const res = contactsArray.find((option) => option.id === contactId);
  return res;
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
