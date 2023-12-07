const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid').v4;

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const deletedContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  return deletedContacts;
};

const addContact = async (body) => {
  const newContact = {
    id: uuid(),
    ...body,
  };

  const allContacts = await listContacts(contactsPath);

  allContacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(allContacts));

  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
