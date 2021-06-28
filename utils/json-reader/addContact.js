const fs = require('fs').promises
const { v4 } = require('uuid')
const contactsPath = require('./contactsPath')
const contactList = require('./listContacts')

const addContact = async (body) => {
  try {
    const list = await contactList()
    const newContact = { id: v4(), ...body }
    const newList = [...list, newContact]
    fs.writeFile(contactsPath, JSON.stringify(newList))
    return newContact
  } catch (error) {
    console.error(error.message)
  }
}

module.exports = addContact
