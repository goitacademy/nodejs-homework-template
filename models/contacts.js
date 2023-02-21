const fs = require('fs/promises')
const path = require('path');
const contactsPath = path.resolve('./models/contacts.json')


const listContacts = async () => {
  try {
    const dataString = await fs.readFile(contactsPath, 'utf8');
    const data = JSON.parse(dataString);
    return data;
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => { }

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

// listContacts()

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
