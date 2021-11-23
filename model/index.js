const contacts = require('./contacts.json')
const shortid = require('shortid')
const fs = require('fs').promises
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => contacts

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(
    (contact) => contact.id.toString() === contactId
  )
  return contact
}

const addContact = async (body) => {
  const newId = shortid.generate()
  const contacts = await listContacts()
  const newContact = { id: newId, ...body }
  contacts.push(newContact)
  await updateListOfContacts(contactsPath, contacts)
  return newContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const newContacts = contacts.filter(
    (item) => item.id.toString() !== contactId
  )
  await updateListOfContacts(contactsPath, newContacts)
  return newContacts
}

const updateContact = async (id, body) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id.toString() === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = { id, ...body }
  await updateListOfContacts(contactsPath, contacts)
  return contacts[idx]
}

const updateListOfContacts = async (path, content) => {
  await fs.writeFile(path, JSON.stringify(content))
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
