const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../../', 'model', 'contacts.json')

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    // if (data.length === 0) {
    //   return console.log(`No contacts`)
    // }
    const contacts = JSON.parse(data)
    return contacts
    // return console.table(contacts)
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = listContacts
