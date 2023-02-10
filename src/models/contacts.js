const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async contactId => {
  if (!contactId) {
    return undefined;
  }

  const data = await fs.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const foundContact = parsedData.find(contact => contact.id === contactId);

  return foundContact;
};

const removeContact = async contactId => {
  if (!contactId) {
    return undefined;
  }

  const data = await fs.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const removeIndex = parsedData.findIndex(contact => contact.id === contactId);

  if (removeIndex === -1) {
    return undefined;
  }

  const removedContact = parsedData[removeIndex];

  parsedData.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(parsedData, undefined, 2));

  return removedContact;
};

const addContact = async body => {
  if (Object.keys(body).length <= 2) {
    return undefined;
  }

  const data = await fs.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  body = { id: uuidv4(), ...body };

  parsedData.push(body);

  fs.writeFile(contactsPath, JSON.stringify(parsedData, undefined, 2));

  return body;
};

const updateContact = async (contactId, body) => {
  if (!contactId) {
    return undefined;
  }

  if (Object.keys(body).length === 0) {
    return undefined;
  }

  const data = await fs.readFile(contactsPath, 'utf-8');
  const parsedData = JSON.parse(data);

  const matchedIndex = parsedData.findIndex(
    contact => contact.id === contactId
  );

  if (matchedIndex === -1) {
    return undefined;
  }

  parsedData[matchedIndex] = { ...parsedData[matchedIndex], ...body };

  fs.writeFile(contactsPath, JSON.stringify(parsedData, undefined, 2));

  return parsedData[matchedIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
