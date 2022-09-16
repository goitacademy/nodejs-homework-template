const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')
console.log('contacts.json', contactsPath)
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    console.log(contacts[0])
    return contacts
  } catch (error) {
    console.log(error.message, 'error with listContacts')
  }
}

// const getContactById = async (contactId) => { }

// const removeContact = async (contactId) => { }

// const addContact = async (body) => { }

// const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
}
