const fs = require('fs/promises');
const path = require('path');
const { all } = require('../app');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts)
}

const getContactById = async (contactId) => {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  const id = allContacts.filter(({ id }) => id === contactId);
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
