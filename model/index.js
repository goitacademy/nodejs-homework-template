const fs = require('fs/promises')
const path = require('path')

const crypto = require('crypto')

const contactsPath = path.join(__dirname, './contacts.json')

const readContacts = async () => {
  const result = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(result)
}

// ====================================update================================
const updateContacts = async (newContact) => {
  const contactStr = JSON.stringify(newContact)
  await fs.writeFile(contactsPath, contactStr)
}

// =======================================list============================
const listContacts = async () => readContacts()

// =====================================get================================
const getContactsById = async (contactId) => {
  const contact = await readContacts()
  const result = contact.find((item) => item.id.toString() === contactId)
  if (!result) {
    return null
  }
  return result
}
// =====================================add================================
const addContact = async (name, email, phone) => {
  const contact = await readContacts()
  const newContact = { id: crypto.randomUUID(), name, email, phone }
  contact.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))
  return newContact
}
// =====================================remove================================
const removeContact = async (contactId) => {
  const contact = await readContacts()
  const idx = contact.find((item) => item.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  const newContacts = contact.filter((item) => item.id.toString() !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2))
  return contact
}

// =====================================update by id================================
const updateContactById = async (contactId, body) => {
  const contact = await readContacts()

  const idx = contact.findIndex(item => item.id.toString() === contactId)
  if (idx === -1) {
    return null
  }
  contact[idx] = { ...contact[idx], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2))

  return contact[idx]
}

module.exports = {
  listContacts,
  getContactsById,
  removeContact,
  addContact,
  updateContactById,
}
