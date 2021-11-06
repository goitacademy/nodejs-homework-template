const fs = require('fs/promises')
const crypto = require('crypto')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath)
  return JSON.parse(contactList)
}

const getContactById = async (contactId) => {
  if (!contactId) {
    return null
  }
  const contactArr = await listContacts()

  return contactArr.filter(
    (item) => item.id === +contactId || item.id === contactId
  )
}

const removeContact = async (contactId) => {
  if (!contactId) {
    return null
  }
  let contactArr = await listContacts()

  contactArr = contactArr.filter(
    (item) => item.id !== +contactId || item.id === contactId
  )
  await fs.writeFile(contactsPath, JSON.stringify(contactArr))

  return contactArr
}

const addContact = async (body) => {
  const { name, email, phone } = body
  if (!name && !email && !phone) {
    return null
  }
  const contactArr = await listContacts()
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  }
  contactArr.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactArr))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  if (!body) {
    return null
  }
  const i = contacts.findIndex(
    (contact) => contact.id === +contactId || contact.id === contactId
  )
  const newBody = { ...body, id: crypto.randomUUID() }

  contacts[i] = { ...contacts[i], ...newBody }
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[i]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
