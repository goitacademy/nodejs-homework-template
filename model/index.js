const fs = require('fs/promises')
const { v4 } = require('uuid')
const path = require('path')
const contacts = require('./contacts.json')

const filePath = path.join(__dirname, 'contacts.json')

const listContacts = async () => contacts

const getContactById = async (contactId) => {
  const contact = contacts.find(item => item.id.toString() === contactId)

  if (!contact) {
    return null
  }

  return contact
}

const removeContact = async (contactId) => {
  const idx = contacts.findIndex(item => item.id.toString() === contactId)

  if (idx === -1) {
    return null
  }

  contacts.splice(idx, 1)
  await rewriteContacts(contacts)
  return 'Contact deleted'
}

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: v4(),
    name,
    email,
    phone
  }

  contacts.push(newContact)
  await rewriteContacts(contacts)

  return newContact
}

const updateContact = async (contactId, body) => {
  const idx = contacts.findIndex(item => item.id.toString() === contactId)

  if (idx === -1) {
    return null
  }

  const updatedContact = { ...contacts[idx], ...body }

  contacts[idx] = updatedContact
  rewriteContacts(contacts)

  return updatedContact
}

const rewriteContacts = async (data) => {
  fs.writeFile(filePath, JSON.stringify(data, null, 2))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
