const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require('path')

const contactsPath = path.join('./model/contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, (err, data) => {    
        if (err) return console.error(err.message)    
        return data 
      }
    )
    return JSON.parse(data)
  } catch (err) {
    console.error(err.message)
  }
}

const getContactById = async (contactId) => {}

const removeContact = async (contactId) => {}

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
