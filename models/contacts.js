const fs = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')

const dataContacts = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(dataContacts)
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const data = contacts.find(contact => contact.id === contactId)
  return data || null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1)
  await fs.writeFile(dataContacts, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async (data) => {
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(),
    ...data
  }
  contacts.push(newContact)
  await fs.writeFile(dataContacts, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
    return null
  }
  contacts[index] = { id, ...contacts[index], ...data };
  await fs.writeFile(dataContacts, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
