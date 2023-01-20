const { v4 } = require('uuid')
const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const result = contacts.find(el => el.id === contactId)
  if (!result) return null
  return result
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const ind = contacts.findIndex(el => el.id === contactId)
  if(ind === -1) {
    return console.log('Contact with this id don`t exist');
  }
  const newContacts = contacts.filter((_, index) => index !== ind)
  await fs.writeFile(contactsPath, JSON.stringify(newContacts))
  return contacts[ind]
 }

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts()
  const newContacts = { id: v4(), name, email, phone }
  contacts.push(newContacts)
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return newContacts
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const ind = contacts.findIndex(el => el.id === contactId)
  if(ind === -1) {
    return null
  }
  contacts[ind] = {id: v4(), ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts))
  return contacts[ind]
   
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
