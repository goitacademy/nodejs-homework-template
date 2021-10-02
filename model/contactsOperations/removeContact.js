const getAll = require('./getAll')
const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, '../../', 'model', 'contacts.json')

const removeContact = async (contactId) => {
  const contacts = await getAll()
  const idx = contacts.findIndex((item) => item.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return true
}
module.exports = removeContact
