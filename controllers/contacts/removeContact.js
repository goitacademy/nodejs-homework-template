const fs = require('fs/promises');
const {listContacts} = require('./index');
const contacts = require('../../model/contacts.json');

const removeContact = async (contactId) => {
  try {
    const data = await listContacts();
    const newContactsList = data.filter(item => item.id !== Number(contactId));

    fs.writeFile(contacts, JSON.stringify(newContactsList));
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  removeContact
}