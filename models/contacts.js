const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getById = async contactId => {
  const allContacts = await listContacts();
  const contactById = allContacts.find(contact => contact.id === contactId);
  return contactById || null;
};

const addContact = async body => {
  const allContacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const removeContact = async contactId => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

const updateContact = async (id, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[index];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
