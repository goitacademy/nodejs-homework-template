const fs = require('fs/promises');
const path = require('path')
const contacts = require('./contacts.json')

const pathContacts = path.resolve('./model/contacts.json')

const listContacts = async () => {
  const contacts = await fs.readFile(pathContacts, 'utf-8')
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await fs.readFile(pathContacts, 'utf-8')
  return JSON.parse(contacts).find(contact=>contact.id === contactId.toString())
}

const removeContact = async (contactId) => {
  const data = await fs.readFile(pathContacts, 'utf-8')
  const newData = JSON.parse(data).filter(item=>item.id !== contactId.toString())
  await fs.writeFile(pathContacts, JSON.stringify(newData))
}

const addContact = async (body) => {
  const data = await fs.readFile(pathContacts, 'utf-8')
  await fs.writeFile(pathContacts, JSON.stringify([...JSON.parse(data), body]))
  return body
}

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(pathContacts, 'utf-8')
  const newData = []
  JSON.parse(data).map(item => {
    if (item.id === contactId.toString()) {
      newData.push(body)
    } else {
      newData.push(item)
    }
  })
  await fs.writeFile(pathContacts, JSON.stringify(newData))  
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
