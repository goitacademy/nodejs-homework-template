
// const contacts = require('./contacts.json')

const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.resolve('./model/contacts.json')

const listContacts = async () => {
  const contactss = await fs.readFile(contactsPath, 'utf8')
  return JSON.parse(contactss)
}
const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(item => item.id === Number(contactId))
  return contact
}

const removeContact = async (contactId) => {
  const contact = await getContactById(contactId)
  const contacts = await listContacts()
  const newContactList = contacts.filter(item => item.id !== Number(contactId))
  await fs.writeFile(contactsPath, JSON.stringify(newContactList, null, 2))
  return contact
}

const addContact = async (body) => {
  const contacts = await listContacts()
  contacts.push(body)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return body
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  await removeContact(contactId)
  const updatedContact = {
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone
  }
  contacts.push(updatedContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return updatedContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}

listContacts()
