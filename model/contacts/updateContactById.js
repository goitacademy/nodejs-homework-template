const path = require('path')
const fs = require('fs/promises')
const { listContacts } = require('./listContacts')

const contactsPath = path.resolve('')

const updateContactById = async (id, data) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((contact) => contact.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...data }
  await fs.writeFile(`${contactsPath}/contacts.json`, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = { updateContactById }
