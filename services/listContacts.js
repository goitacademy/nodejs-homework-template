const contactsPath = require('./contactsPath');

const fs = require('fs/promises');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw new Error('Not found contacts');
  }
}

module.exports = listContacts;
