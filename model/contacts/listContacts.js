const fs = require('fs/promises')
const contactsPath = require('./filePath.js')

// const contactsOperations = require('../../model')

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(contacts)
  } catch (error) {
    console.log(error.message)
  }
}
// const listContacts = async () => contactsOperations.getAll()

module.exports = listContacts
