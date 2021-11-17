const path = require('path')
const fs = require('fs').promises
const { dbPath } = require('../bin/settings')
console.log(' dbPath - ', dbPath)
const contactsPath = path.resolve(dbPath)

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8')
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    console.log('Catch error', error.message)
    return error
  }
}

module.exports = listContacts
