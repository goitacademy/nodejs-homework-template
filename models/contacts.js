/* eslint-disable no-useless-catch */

const fs = require('fs/promises')
const path = require('path')
const {nanoid}=require('nanoid')

const filePath=path.join(__dirname,'contacts.json')

const listContacts = async () => {
    const result = await fs.readFile(filePath)
    const contacts = JSON.parse(result)
    return contacts
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
  if (!contact) return null;
    return contact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId)
  if (idx === -1) return null;
  const [removeContact] = contacts.splice(idx, 1)
  await fs.writeFile(filePath,JSON.stringify(contacts) )
  return removeContact

}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(10), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(filePath,JSON.stringify(contacts) )
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId)
  if (!result) return null;
  result.name = body.name
  result.email = body.email
  result.phone = body.phone
  await fs.writeFile(filePath, JSON.stringify(contacts))
    return result

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
