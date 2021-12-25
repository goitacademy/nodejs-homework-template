const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')


const contacts = require('./contacts.json')

const listContacts = async () => {
  // throw new Error('we can not find contacts')
  return contacts
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(contact => contact.id ===id)
  return contact
}

const removeContact = async (contactId) => {}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {id: crypto.randomUUID(), name, email, phone}
  contacts.push(newContact)
  await fs.writeFile(path.join(__dirname,'contacts.json'),JSON.stringify(contacts,null,2))
  return newContact
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
