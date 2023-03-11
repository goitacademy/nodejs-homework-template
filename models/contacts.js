// const fs = require('fs/promises')
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// const contactsPath = path.resolve('contacts.json');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(result);

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
