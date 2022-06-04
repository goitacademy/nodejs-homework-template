const fs = require('fs').promises;
const contactsPath = require('./contactsPath');

async function listContacts() {
  const dataContacts = await fs.readFile(contactsPath);
  const dataContactsGetAll = JSON.parse(dataContacts);
  console.log(dataContactsGetAll);
  return dataContactsGetAll;
}

module.exports = listContacts;
