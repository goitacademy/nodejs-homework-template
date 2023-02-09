const fs = require('fs/promises');
const path = require('path')
const {v4} = require("uuid");

const filePath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(filePath)
    const list = JSON.parse(data)
    return list;
}

const getContactById = async (contactId) => {
  const data = await listContacts()
  const contactById = await data.find(item => item.id === contactId)
  return contactById
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const requestedContact = contacts.find(contact => contact.id === contactId)

  if (!requestedContact) return false

  const updatedContacts = contacts.filter(contact => contact.id !== contactId)
  await fs.writeFile(filePath, JSON.stringify(updatedContacts))

  return requestedContact
}

const addContact = async (body) => {
    const contacts = await listContacts()
    const newContact = {...body, id: v4()};
    contacts.push(newContact)
  await fs.writeFile(filePath, JSON.stringify(contacts))
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const requestedContact = contacts.find(contact => contact.id === contactId)

  if (!requestedContact) return

  const updatedContacts = contacts.map(contact => {
    if (contact.id === contactId) {
      return {...contact, ...body}
    }
    return contact
  })

  await fs.writeFile(filePath, JSON.stringify(updatedContacts))

  return updatedContacts.find(contact => contact.id === contactId)
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
