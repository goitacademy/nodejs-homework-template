const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')
const contacts = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const allContacts = await fs.readFile(contacts, 'utf-8')
  return JSON.parse(allContacts)
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const getContact = allContacts.find(({ id }) => id.toString() === contactId)
  return getContact
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts()
  const contactsUpdate = allContacts.filter(({ id }) => id.toString() !== contactId)
  await fs.writeFile(contacts, JSON.stringify(contactsUpdate), 'utf-8')
  return contactsUpdate
}

const addContact = async (body) => {
  const allContacts = await listContacts()
  const newContact = { _id: uuid(), ...body }
  const newContacts = [...allContacts, newContact]
  await fs.writeFile(contacts, JSON.stringify(newContacts), 'utf-8')
  return newContact
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const contact = allContacts.find(item => toString(item.id) === contactId)
  const changeContact = { ...contact, ...body }
  const changeContacts = allContacts.map(item => toString(item.id) === contactId ? changeContact : item)
  await fs.writeFile(contacts, JSON.stringify(changeContacts), 'utf-8')
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
