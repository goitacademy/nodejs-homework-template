const fs = require('fs/promises')
const crypto = require('crypto')
const DB = require('./db')
const db = new DB('contacts.json')


const listContacts = async () => {
  return db.readFile()
}

const getContactById = async (contactId) => {
  const allContacts = await db.readFile()
  const [contact] = allContacts.filter((contact) => contact.id === contactId)
  return contact
}

const removeContact = async (contactId) => {
  const allContacts = await db.readFile()
  const index = allContacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const [result] = allContacts.splice(index, 1)
    await db.writeFile(allContacts)
    return result
  }
  return null
}

const addContact = async (body) => {
  const allContacts = await db.readFile()
  const newContact = {
    id: crypto.randomUUID(),
    ...body,
  }

  allContacts.push(newContact)
  await db.writeFile(allContacts)
  return newContact
}

const updateContact = async (contactId, body) => {
  const allContacts = await db.readFile()
  const index = allContacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    allContacts[index] = { ...allContacts[index], ...body }
    await db.writeFile(allContacts)
    return allContacts[index]
  }
  return null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
