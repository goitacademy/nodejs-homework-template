// const fs = require('fs/promises')
// const contacts = require('./contacts.json')
const crypto = require('crypto')
const DB = require('./db')
const db = new DB('contacts.json')

const listContacts = async () => {
  return await db.read()
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contactToFind = contacts.find(
    (contact) => String(contact.id) === contactId
  )
  return contactToFind
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const contactIndex = contacts.find((contact) => String(contact.id) === contactId)
  if (contactIndex !== -1) {
    const [result] = contacts.splice(contactIndex, 1)

    await db.write(contacts)
    return result

  }
  return null
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = {
    id: crypto.randomUUID(),

    ...body,

  }
  contacts.push(newContact)
  await db.write(contacts)
  return newContact

}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const contactIndex = contacts.find((contact) => String(contact.id) === contactId)
  if (contactIndex !== -1) {
    const contact = contacts[contactIndex]
    contacts[contactIndex] = { ...contact, ...body }
    await db.write(contacts)
    return contacts[contactIndex]

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
