const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join('db', 'contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    return JSON.parse(data.toString())
  } catch (error) {
    console.log(error)
  }
}

module.exports = { listContacts }
