const fs = require('fs/promises')
const path = require('path');
const contactsPath = path.resolve('./models/contacts.json');
const shortid = require('shortid');

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
} 

const getContactById = async (contactId) => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response).filter(contact => contact.id == contactId)[0];
}

const removeContact = async (contactId) => {
  const response = await fs.readFile(contactsPath).catch(err => console.error(err.message));
  const contacts = JSON.parse(response);
  const objWithIdIndex = contacts.findIndex((contact) => contact.id == contactId);

  if (objWithIdIndex === -1) { 
    throw new Error('User with this id does not exist');
  }

  contacts.splice(objWithIdIndex, 1);
  const contactsList = JSON.stringify([...contacts], null, '\t')
  await fs.writeFile(contactsPath, contactsList).catch(err => console.error(err.message));
  return response;
}

const addContact = async ({ name, email, phone }) => {
  const allContacts = await fs.readFile(contactsPath).catch(err => console.error(err.message));
  const contactNew = {id: shortid.generate(), name, email, phone }
  const contactsList = JSON.stringify([contactNew, ...JSON.parse(allContacts)], null, '\t')
  await fs.writeFile(contactsPath, contactsList).catch(err => console.error(err.message));
  return JSON.parse(contactsList);
}

const updateContact = async (contactId, body) => {
  const response = await fs.readFile(contactsPath).catch(err => console.error(err.message));
  const contacts = JSON.parse(response);
  const objWithIdIndex = contacts.findIndex((contact) => contact.id == contactId);
  if (objWithIdIndex === -1) { 
    throw new Error('User with this id does not exist');
  }
  contacts[objWithIdIndex] = {
    ...contacts[objWithIdIndex],
    ...body
  };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts], null, '\t'));
  return contacts[objWithIdIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
