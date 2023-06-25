const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const pathToContacts = path.join(__dirname, './contacts.json');

const getAllContacts = async path => {
  const allContacts = await fs.readFile(path);
  return JSON.parse(allContacts, null, 2);
};

const listContacts = async () => {
  return await getAllContacts(pathToContacts);
};

const getContactById = async ({ id }) => {
  const allContacts = await getAllContacts(pathToContacts);
  const contact = allContacts.find(contact => contact.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async ({ id }) => {
  const allContacts = await getAllContacts(pathToContacts);
  const contactIndex = allContacts.findIndex(contact => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const [removedContact] = allContacts.splice(contactIndex, 1);
  await fs.writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const allContacts = await getAllContacts(pathToContacts);
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async ({ id, name, email, phone }) => {
  const allContacts = await getAllContacts(pathToContacts);
  const contactIndex = allContacts.findIndex(contact => contact.id === id);
  if (contactIndex === -1) {
    return null;
  }
  allContacts[contactIndex] = { id, name, email, phone };
  await fs.writeFile(pathToContacts, JSON.stringify(allContacts, null, 2));
  return allContacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
