const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../../settings')
const contactsPath = path.resolve(dbPath)

const listContacts = require('./listContacts')

async function removeContact(contactId) {
  const contacts = await listContacts()
  const filtredContacts = contacts.filter(contact => contact.id !== contactId)
  if (contacts.length === filtredContacts.length) {
    console.log('Nothing was deleted. Contact with id "' + contactId + '" was not found in database.')
    return
  }
  try {
    fs.writeFile(contactsPath, JSON.stringify(filtredContacts), 'utf8')
    console.log('Contact with id - ' + contactId + ' removed successfully')
    console.table(filtredContacts)
    return filtredContacts
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = removeContact
