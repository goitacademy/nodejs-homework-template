const fs = require('fs').promises;
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
};

const getContactById = async contactId => {
  const array = await listContacts();
  const contact = array.find(item => item.id === contactId);
  return contact || null;
};

const removeContact = async contactId => {
  const array = await listContacts();
  const index = array.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  const contact = array.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(array, null, 2), 'utf8');
  return contact;
};

const addContact = async body => {
  const array = await listContacts();
  const contact = { id: nanoid(), ...body };
  array.push(contact);
  fs.writeFile(contactsPath, JSON.stringify(array, null, 2), 'utf8');
  return contact;
};

const updateContact = async (contactId, body) => {
  const array = await listContacts();
  const index = array.findIndex(item => item.id === contactId);
  if (index === -1) return null;
  array[index] = { ...array[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(array, null, 2), 'utf8');
  return array[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
