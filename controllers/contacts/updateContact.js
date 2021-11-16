const fs = require('fs/promises')
const path = require('path')
const readData = require('./readData')

const contactsPath = path.join(__dirname, '../../models/contacts/contacts.json')

const updateContact = async (id, data) => {
  const contacts = await readData()

  const idx = contacts.findIndex(item => JSON.parse(item.id) === JSON.parse(id))
  if (idx === -1) {
    return null
  }

  id = JSON.parse(id)
  contacts[idx] = { ...data, id }
  const contactStr = JSON.stringify(contacts, null, 2)
  await fs.writeFile(contactsPath, contactStr)

  return contacts[idx]
}

module.exports = updateContact
