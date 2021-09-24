const fs = require('fs/promises')
const path = require('path')
const PATH_DB = path.join(__dirname, 'contacts.json')

const listContactsModel = async () => {
  try {
    const contacts = await fs.readFile(PATH_DB, 'utf-8')
    const parsedContacts = JSON.parse(contacts)
    return parsedContacts
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = listContactsModel
