const fs = require('fs/promises')
const path = require('path')
const getAll = require('./getAll')

const contactsPath = path.join(__dirname, '../db/contacts.json')

const removeContact = async (id) => {
  const contacts = await getAll()
  const index = contacts.findIndex((item) => item.id === id)
  if (index === -1) {
    return null
  }
  const update = contacts.filter((contact) => contact.id !== id)
  await fs.writeFile(contactsPath, JSON.stringify(update, null, 2))
  return update
}

module.exports = removeContact
