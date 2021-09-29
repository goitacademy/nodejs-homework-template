const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, '../../model/contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts
}