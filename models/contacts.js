const fs = require('fs/promises')
const path = require('path')


const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const requestedContact = JSON.parse(data).find(contact => contact.id === contactId)

  return requestedContact
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const parsedData = JSON.parse(data)
  const requestedContact = parsedData.find(contact => contact.id === contactId)

  if (!requestedContact) return false

  const updatedContacts = parsedData.filter(contact => contact.id !== contactId)
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

  return updatedContacts
}

const addContact = async (body) => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const updatedContacts = [...JSON.parse(data), body]
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

  return body
}

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath, 'utf-8')
  const parsedData = JSON.parse(data)
  const requestedContact = parsedData.find(contact => contact.id === contactId)

  if (!requestedContact) return

  const updatedContacts = parsedData.map(contact => {
    if (contact.id === contactId) {
      return {...contact, ...body}
    }
    return contact
  })

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))

  return updatedContacts.find(contact => contact.id === contactId)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
