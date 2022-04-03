//  const fs = require('fs/promises')
const { randomUUID } = require('crypto')
const DB = require('./db')
const db = new DB ('contacts.json')



async function listContacts ()  {
  return await db.read()
};

// const listContacts = async () => {}

async function getContactById (contactId) {
  const contacts = await db.read()
  const [contact] = contacts.filter((contact) => contact.id === contactId )
return contact
}

async function removeContact (contactId, body) {
  const contacts = await db.read()
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1)
    await db.write(contacts)
return contact
  }
return null
}

async function addContact (body) {
  const contacts = await db.read()
  const newContact = {
    id: randomUUID(),
    ...body
  }
contacts.push(newContact)
await db.write(contacts)
return newContact
}

async function updateContact (contactId, body) {
  const contacts = await db.read()
  const index = contacts.findIndex((contact) => contact.id === contactId)
  if (index !== -1) {
    contacts[index] = {...contacts[index], ...body}
    await db.write(contacts)
    return contacts[index]
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
