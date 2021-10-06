const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join('./contacts.json')

const addContact = async ({ name, email, phone }) => {
  try {
    const contacts = await listContacts()
    const newContact = { id: v4(), name, email, phone }
    contacts.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return newContact
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = addContact
