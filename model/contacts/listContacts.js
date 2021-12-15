const fs = require('fs').promises;
const contactsPath = require('./contactPath');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  if (!contacts) {
    return console.log('Не удалось найти контакты');
  }
  return contacts;
};

module.exports = listContacts;
