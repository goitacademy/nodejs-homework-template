const fs = require('fs/promises')
const path = require('path')
const { v4 } = require('uuid')
const { listContacts } = require('./listContacts')

const contactsPath = path.resolve('')

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...data }
  contacts.push(newContact)
  await fs.writeFile(`${contactsPath}/contacts.json`, JSON.stringify(contacts))
  return newContact
}

module.exports = { addContact }
