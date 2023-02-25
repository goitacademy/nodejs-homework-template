const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contact = data.find(({ id }) => id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const deletedContact = data.find(({ id }) => id !== contactId);
  const filteredContacts = data.filter(({ id }) => id !== contactId);

  if (!deletedContact) {
    return
  } 
  await fs.writeFile(
    contactsPath,
    JSON.stringify(filteredContacts, null, 2),
    'utf8'
  )
  return deletedContact;
};

const addContact = async (body) => { 
  const data = await listContacts();
  const newContact = { id: uuidv4(), ...body }

  data.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf8')

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id !== contactId);
  if(index === -1) {
    return null;
  }
  contacts[index] = {contactId, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
