const fs = require('fs/promises')

const path = require('path')
const { v4 } = require('uuid')

const contactsPath = path.join(__dirname, 'contacts.json')

const newContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const allContacts = JSON.parse(data)
  return allContacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contactById = contacts.find(
    (contact) => String(contact.id) === contactId
  )
  if (!contactById) {
    return null
  }
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((contact) => String(contact.id) === contactId)
  if (idx === -1) {
    return null
  }
  const updatedContacts = contacts.filter((_, index) => index !== idx)
  await newContacts(updatedContacts)
  return contacts[idx]
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = { id: v4(), ...body }
  contacts.push(newContact)
  await newContacts(contacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((contact) => String(contact.id) === contactId)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id: contactId, ...body }
  await newContacts(contacts)
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
