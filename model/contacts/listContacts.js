const fs = require('fs/promises')
const contactsPath = require('../../db/filePath')

const listContacts = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data)
    return contacts
  } catch (error) {
    throw error
  }
}

module.exports = listContacts
