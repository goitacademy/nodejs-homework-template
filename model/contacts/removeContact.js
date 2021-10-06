const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join('./contacts.json')

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === Number(contactId))
    if (!idx) {
      return null
    }

    contacts.splice(idx, 1)
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return true
  } catch (error) {
    console.log(error.message)
  }
}

module.exports = removeContact
