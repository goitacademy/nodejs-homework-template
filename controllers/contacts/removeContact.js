const fs = require('fs/promises');
const path = require('path');
const { listContacts } = require('./listContacts');

const contactsPath = path.join(__dirname, '../../model/contacts.json');

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContactsList = data.filter(item => String(item.id) !== String(contactId));

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  removeContact
}