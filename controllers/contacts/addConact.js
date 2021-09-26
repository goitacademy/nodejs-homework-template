const fs = require('fs/promises');
const { listContacts } = require('./index');
const shortid = require('shortid');

const addContact = async ({name, email, phone}) => {
  try {
    const newContact = {
      id: shortid.generate(),
      name,
      email,
      phone
    }

    const data = await listContacts();
    const newContactsList = [...data, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addContact
}