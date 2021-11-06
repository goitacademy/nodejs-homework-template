const fs = require('fs/promises')
const path = require('path')

const crypto = require('crypto')

const contactsPath = path.join(__dirname, './contacts.json')

const readContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(result)
}

// =======================================list============================
const listContacts = async () => readContacts()

// =====================================get================================
const getContactsById = async (contactId) => {
  const contacts = await readContacts()
  const result = contacts.find((item) => item.id.toString() === contactId)
  if (!result) {
    return null
  }
  return result
}
// =====================================add================================
const addContact = async (name, email, phone) => {
  const contacts = await readContacts()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}
// =====================================remove================================
const removeContact = async (contactId) => {
  const contacts = await readContacts()
  const idx = contacts.find((item) => item.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  const newContacts = contacts.filter((item) => item.id.toString() !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  return contacts
}

// =====================================update by id================================
const updateContactById = async (contactId, body) => {
  const contacts = await readContacts()

  const idx = contacts.findIndex(item => item.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { ...contacts[idx], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))

  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
  updateContactById,
}
