const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../settings')
console.log(' dbPath - ', dbPath)
const contactsPath = path.resolve(dbPath)

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = listContacts
