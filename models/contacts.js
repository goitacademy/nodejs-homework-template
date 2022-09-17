const fs = require('fs').promises
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')
console.log('contacts.json', contactsPath)

const listContacts = async (req, res) => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8")
    const allContacts = JSON.parse(data)
    if (allContacts.length !== 0) {
      return res.status(200).json(allContacts);
    }
    return null
  } catch (error) {
    console.error('ERROR listContacts:', error.message);
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
