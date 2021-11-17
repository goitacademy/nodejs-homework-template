const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
const contactsPath = path.resolve(dbPath)

const listContacts = require('./listContacts')

async function removeContact(contactId) {
  const contacts = await listContacts()
  const filtredContacts = contacts.filter(contact => parseInt(contact.id) !== parseInt(contactId))

  try {
    if (contacts.length === filtredContacts.length) {
      throw new Error('Not found')
    }
    fs.writeFile(contactsPath, JSON.stringify(filtredContacts))
    console.log('Contact with id - ' + contactId + ' removed successfully')
    return { message: null }
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = removeContact
