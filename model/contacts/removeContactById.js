const fs = require('fs/promises')
const path = require('path')
const { listContacts } = require('./listContacts')

const contactsPath = path.resolve('')

const removeContactById = async (id) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((contact) => contact.id === id)
  if (idx === -1) {
    return null
  }
  const [removeContact] = contacts.splice(idx, 1)
  await fs.writeFile(`${contactsPath}/contacts.json`, JSON.stringify(contacts))
  return removeContact
}

module.exports = { removeContactById }
