const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid');
const CreateError = require('http-errors');

const contactsPath = path.resolve('./models/contacts.json');

const tryAsync = async (asyncFunction, ...args) => {
  try {
    return await asyncFunction(...args);
  } catch (error) {
    throw new CreateError.BadGateway('Contacts data not found');
  }
};

const listContacts = async () => {
  const contacts = await tryAsync(fs.readFile, contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await tryAsync(listContacts);
  return contacts.find(contact => contact.id === contactId);
};

const addContact = async body => {
  const contacts = await tryAsync(listContacts);

  const id = generateNewId(contacts);
  const newContacts = [...contacts, { id, ...body }];

  await tryAsync(fs.writeFile, contactsPath, JSON.stringify(newContacts));
  return { id, ...body };
};

const updateContact = async (contactId, body) => {
  const contacts = await tryAsync(listContacts);
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) return null;
  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };

  await tryAsync(fs.writeFile, contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
};

const removeContact = async contactId => {
  const contacts = await tryAsync(listContacts);
  const filteredContacts = contacts.filter(contact => contact.id !== contactId);
  const stringifiedContacts = JSON.stringify(filteredContacts);
  await tryAsync(fs.writeFile, contactsPath, stringifiedContacts);

  return contacts.length !== filteredContacts.length;
};

const generateNewId = contacts => {
  let id = '';
  do {
    id = nanoid();
  } while (isIdInData(id, contacts));
  return id;
};

const isIdInData = (id, data) => data.some(item => item.id === id);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
