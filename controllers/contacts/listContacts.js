const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../../settings')
const contactsPath = path.resolve(dbPath)

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    console.table(contacts)
    return contacts
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = listContacts
