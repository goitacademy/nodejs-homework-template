const fs = require('fs/promises');
const contactsPath = require('./contactsPath');

async function getContacts() {
  const data = await fs.readFile(contactsPath);

  try {
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.warn(`\x1B[31m${error.message}`);
    return null;
  }
}

module.exports = getContacts;
