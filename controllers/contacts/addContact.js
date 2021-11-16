const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')
const readData = require('./readData')

const contactsPath = path.join(__dirname, '../../models/contacts/contacts.json')

const addContact = async (contact) => {
  const { name, email, phone } = contact
  const contacts = await readData()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContact)

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
  )
  return newContact
}

module.exports = addContact
