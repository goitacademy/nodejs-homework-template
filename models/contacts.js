const fs = require('fs/promises')
const path = require('path')

const getMaxId = (data) => {
  const idList = data.map(contact => contact.id)
  return Math.max(...idList) + 1
}

const listContacts = async () => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  return JSON.parse(contacts).filter(contact => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const parsedContacts = JSON.parse(contacts)
  parsedContacts = parsedContacts.splice(parsedContacts.findIndex(contact => contact.id === contactId), 1)
  await fs.writeFile(path.join(__dirname, 'contacts.json'), parsedContacts)
  return parsedContacts
}

const addContact = async (body) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const parsedContacts = JSON.parse(contacts)
  const id = getMaxId(parsedContacts).toString()
  parsedContacts.push({id: id, name: body.name, email: body.email, phone: body.phone})
  await fs.writeFile(path.join(__dirname, 'contacts.json'), parsedContacts)
  return parsedContacts
}

const updateContact = async (contactId, body) => {
  const contacts = await fs.readFile(path.join(__dirname, 'contacts.json'))
  const parsedContacts = JSON.parse(contacts)
  parsedContacts[parsedContacts.findIndex(contact => contact.id === contactId)] = {id: contactId, name: body.name, email: body.email, phone: body.phone}
  await fs.writeFile(path.join(__dirname, 'contacts.json'), parsedContacts)
  return parsedContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
