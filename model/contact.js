const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const contactsPath = path.join(__dirname, '../model/contacts.json')
const contactList = fs.readFile(contactsPath, 'utf8')

const listContacts = async () => {
  return JSON.parse(await contactList)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(({ id }) => String(id) === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactsUpdated = contacts.filter(({ id }) => String(id) !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(contactsUpdated, null, 2), 'utf-8')
  return contactsUpdated
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const id = uuid()
  const newContact = { id, ...body }
  const listUpdated = [...contacts, newContact]

  await fs.writeFile(
    contactsPath,
    JSON.stringify(listUpdated, null, 2),
    'utf-8'
  )
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contact = contacts.find(({ id }) => String(id) === contactId)

  const updatedContact = { ...contact, ...body }
  const updatedContactList = contacts.map((obj) => String(obj.id) === contact.id ? updatedContact : obj)
  await fs.writeFile(
    contactsPath,
    JSON.stringify(updatedContactList, null, 2),
    'utf-8'
  )
  return updatedContactList
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
