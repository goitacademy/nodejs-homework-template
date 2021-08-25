const fs = require('fs/promises');
const path = require('path');
// const contacts = require('./contacts.json');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const update = async items => {
  const itemsString = JSON.stringify(items);
  await fs.writeFile(contactsPath, itemsString);
};

const contactIndex = async id => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  return index;
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return (contacts = JSON.parse(data));
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const index = await contactIndex(contactId);
  if (index === -1) {
    throw new Error(`Contacts with id=${contactId} not found`);
  }
  return contacts[index];
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = await contactIndex(contactId);
  if (index === -1) {
    throw new Error(`Contacts with id=${contactId} not found`);
  }
  const restContacts = contacts.filter(item => item.id !== contactId);
  await update(restContacts);
  return contacts[index];
};

const addContact = async body => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), ...body };
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const [contactToUpdate] = contacts.filter(item => item.id === contactId);
  if (contactToUpdate) {
    Object.assign(contactToUpdate, body);
    await update(contacts);
  }
  return contactToUpdate;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
