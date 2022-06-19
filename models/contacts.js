const fs = require('fs/promises')
const path = require('path')
const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const result = await (fs.readFile(contactsPath))
  return JSON.parse(result)
}

const getContactById = async (contactId) => {
  const result = await listContacts()
  const contact = result.find(el => el.id === contactId)
  // if (!contact) return null
  return contact
}

const removeContact = async (contactId) => {
  const result = await listContacts()
  const idx = result.findIndex(el => el.id === contactId)
  if (idx === -1) return null
  const newContacts = result.filter(el => el.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
}

const addContact = async (body) => {
  const result = await listContacts()
  body.id = Date.now().toString()
  result.push(body)
  await fs.writeFile(contactsPath, JSON.stringify(result))
  return body
}

const updateContact = async (contactId, body) => {
  const result = await listContacts()
  const idx = result.findIndex(el => el.id === contactId)
  if (idx === -1) return null
  result[idx] = { ...result[idx], ...body }
  await fs.writeFile(contactsPath, JSON.stringify(result))
  return result[idx] 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
