const fs = require('fs/promises')
const path = require('path')
const {v4} = require('uuid')



const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const findedContact = contacts.find(contact => contact.id === contactId)
  if (!findedContact) {
    throw new Error('Not Found')
  }
  return findedContact

}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) {
    return null
  }
  const [removedContact] = contacts.splice(idx, 1)
  fs.writeFile(contactsPath, JSON.stringify(contacts))
  return removedContact
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts() 
  const newContact = {
    name,
    email,
    phone,
    id: v4()
  }
  contacts.push(newContact)
  fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContact
}

const updateContactById = async (id, {name, email, phone}) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex(item => item.id === id)
  if (idx === -1) {
    return null
  }
  contacts[idx] = {name, email, phone, id }
  fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
