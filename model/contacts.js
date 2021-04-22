const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid');

const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath)
  return JSON.parse(data).find(user => String(user.id) === contactId)
}

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  const id = uuidv4()
  const record = {
    id,
    ...body
  }
  const data = await fs.readFile(contactsPath)
  const users = JSON.parse(data)
  users.push(record)
  fs.writeFile(contactsPath, JSON.stringify(users, null, '\t'))

  return record
}

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data)
  
  const contact = contacts.find(contact => String(contact.id) === contactId)

  const newContact = contacts.assign(contact, body)

    contacts.forEach((item, i) => {
    if (String(item.id) === contactId)
      contacts[i] = newContact;
    });
  
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, '\t'))

  return newContact.id ? newContact : null
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
}
