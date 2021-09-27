const { nanoid } = require('nanoid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, '../../db', 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const writeContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => contact.id === contactId)

  if (idx === -1) {
    return null
  }

  return contacts[idx]
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { ...body, id: nanoid() }
  contacts.push(newContact)
  await writeContacts(contacts)
  return newContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }

  contacts.splice(idx, 1)
  await writeContacts(contacts)
  return true
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(contact => contact.id === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await writeContacts(contacts)
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
