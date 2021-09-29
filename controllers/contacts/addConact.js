const fs = require('fs/promises');
const path = require('path');
const { listContacts } = require('./listContacts');
const shortid = require('shortid');

const contactsPath = path.join(__dirname, '../../model/contacts.json');


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

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList));
    return newContact;

  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  addContact
}