const fs = require('fs/promises');

const contactsPath = require('../../bd/contactsPath');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

module.exports = listContacts;