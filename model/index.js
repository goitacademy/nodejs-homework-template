const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const updateContacts = async (newContact) => {
  const contactsString = JSON.stringify(newContact)
  await fs.writeFile(contactsPath, contactsString)
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf8')
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts(contactsPath)
  const contactById = contacts.find((contact) => contact.id === contactId)
  if (!contactById) {
    return null
  }
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts(contactsPath)
  const idx = contacts.findIndex((contact) => contact.id === contactId)
  if (idx === -1) {
    return null
  }
  const removeContact = contacts.splice(idx, 1)
  await updateContacts(contacts)
  return removeContact
}

const addContact = async (body) => {
  const contacts = await listContacts(contactsPath)
  const lastContactOfContacts = contacts[contacts.length - 1]
  const newContactId = lastContactOfContacts.id + 1
  const newContact = { ...body, id: newContactId }
  contacts.push(newContact)
  await updateContacts(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts(contactsPath)
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId)
  if (!contactIdx) {
    return null
  }
  contacts[contactIdx] = { ...body, id: contactId }
  await updateContacts(contacts)
  return contacts[contactIdx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
