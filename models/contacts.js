const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.resolve('./models/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
} catch(err) {
    console.error(err);
}
};

const getContactById = async (contactId) => {
  const data  = await listContacts();
    return data.find(x => x.id === contactId);
    
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
