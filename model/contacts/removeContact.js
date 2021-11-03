const fs = require('fs/promises')
const listContacts = require('./listContacts')
const contactsPath = require('../../db/filePath')

const removeContact = async contactId => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts()

    const contact = contacts.find(item => item.id === Number(contactId))

    if (contact) {
      const newContacts = contacts.filter(item => item.id !== Number(contactId))

      const contactsString = JSON.stringify(newContacts)

      await fs.writeFile(contactsPath, contactsString)

      return contact
    }
  } catch (error) {
    throw error
  }
}

module.exports = removeContact
