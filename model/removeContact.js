const fs = require('fs/promises')

const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const removeContact = async (contactId) => {
  const contactsList = await listContacts()
  const contactIndex = await contactsList.findIndex((el) => el.id === +contactId)

  if (!~contactIndex) {
    return null
  }

  const removedContact = await contactsList.splice(contactIndex, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList))

  return removedContact
}

module.exports = removeContact
