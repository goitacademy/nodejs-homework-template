const fs = require('fs').promises
const path = require('path')
const contactsPath = path.resolve(__dirname, './contacts.json')

const listContacts = async () => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)
  return contacts
}

const getContactById = async (contactId) => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const targetContact = contacts.find((contact) => contact.id === Number(contactId))

  return targetContact
}

const removeContact = async (contactId) => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const targetContact = contacts.find((contact) => contact.id === Number(contactId))

  contacts.splice(targetContact.id - 1, 1)

  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return targetContact
}

const addContact = async (body) => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  const newContact = {
    id: contacts[contacts.length - 1].id + 1,
    ...body
  }

  contacts.push(newContact)

  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  return newContact
}

const updateContact = async (contactId, body) => {
  let contacts = await fs.readFile(contactsPath)
  contacts = JSON.parse(contacts)

  let targetContact = contacts.find((contact) => contact.id === Number(contactId))
  contacts = contacts.map((contact) => contact.id === Number(contactId) ? { ...contact, ...body } : contact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))

  targetContact = contacts.find((contact) => contact.id === Number(contactId))

  return targetContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
