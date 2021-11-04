const fs = require('fs/promises')
const path = require('path')
const { contactsPath } = require('./contactPath')

const removeContact = async (contactId) => {
  const contacts = await contactsPath()
  const [deletedContact] = contacts.filter(contact => contact.id === contactId)

  if (!deletedContact) {
    return null
  }
  const newContactList = contacts.filter(contact => contact.id !== contactId)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), JSON.stringify(newContactList, null, 2))
  return deletedContact
}

module.exports = removeContact
