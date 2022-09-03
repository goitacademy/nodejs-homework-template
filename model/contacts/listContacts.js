const fs = require('fs/promises');
const filePath = require('./helpers/filePath');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

listContacts();

module.exports = listContacts