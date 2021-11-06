const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, './contacts.json')
const crypto = require('crypto')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const allContacts = JSON.parse(data)
  if (!allContacts) {
    return []
  }

  return allContacts
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts()
  const result = allContacts.find((item) => item.id === parseInt(contactId))
  if (!result) {
    return null
  }
  return result
}

const addContact = async (body) => {
  const allContacts = await listContacts()
  const newContact = { id: crypto.randomUUID(), ...body }
  allContacts.push(newContact)

  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)

  return newContact
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts()
  const idx = allContacts.findIndex((item) => item.id === parseInt(contactId))
  if (idx === -1) {
    return null
  }
  const removeContact = allContacts.splice(idx, 1)
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return removeContact
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts()
  const idx = allContacts.findIndex((item) => item.id === parseInt(contactId))
  if (idx === -1) {
    return null
  }
  allContacts[idx] = { ...body, contactId }
  allContacts.push(allContacts[idx])
  const contactsString = JSON.stringify(allContacts)
  await fs.writeFile(contactsPath, contactsString)
  return allContacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
