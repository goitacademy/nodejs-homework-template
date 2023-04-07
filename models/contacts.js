const fs = require('fs/promises');
const path = require('path');

// const fs = require('fs').promises;

const contactsPath = path.resolve('./models/contacts.json'); //! Виводить абсолютний шлях до файлу contacts.json

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
    // const contacts = JSON.parse(data);
    // return console.table(contacts);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
