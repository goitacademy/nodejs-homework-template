const fs = require('fs/promises')
const path = require('path')
const getAll = require('./getAll')

const contactsPath = path.join(__dirname, '../db/contacts.json')

const updateContact = async (id, body) => {
  const contacts = await getAll()
  const contact = contacts.find((contact) => contact.id === id)
  if (!contact) return
  Object.assign(contact, body)
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contact
}

module.exports = updateContact
