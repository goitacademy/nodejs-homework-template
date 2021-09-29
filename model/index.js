const fs = require('fs/promises')
const path = require('path');
// const contactsPath = require('./contacts.json')

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8');
  return JSON.parse(data);
}

const getById = async (contactId) => {
    const contacts = await listContacts();
     const contact = contacts.find(({ id }) => id.toString() === contactId);
  return contact;
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
