const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const getAll = require('./getAll')

const contactsPath = path.join(__dirname, '../db/contacts.json')

const addContact = async ({ name, email, phone }) => {
  const contacts = await getAll()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = addContact
