const fs = require('fs/promises')
const listContacts = require('./listContacts')
const contactsPath = require('../../db/filePath')

const updateContact = async (contactId, body) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const contacts = await listContacts()

    const contact = contacts.find(item => item.id === Number(contactId))

    if (contact) {
      const updContact = { ...contact, ...body }

      const newContacts = contacts.map(contact => {
        return contact.id === Number(contactId) ? updContact : contact
      })

      await fs.writeFile(contactsPath, JSON.stringify(newContacts))

      return updContact
    } else {
      return null
    }
  } catch (error) {
    throw error
  }
}

module.exports = updateContact
