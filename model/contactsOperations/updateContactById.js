const getAll = require('./getAll')
const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../../', 'model', 'contacts.json')

const updateContactsById = async (contactId, data) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...data }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}
module.exports = updateContactsById
 