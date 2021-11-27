const fs = require('fs/promises');

const contactsPath = require('./contactsPath');

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = listContacts;
