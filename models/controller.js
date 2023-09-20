const fs = require('fs/promises');
const { nanoid } = require('nanoid');

const path = require('path');


const contactsPath = path.join(__dirname,  "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath)
  return JSON.parse(contacts)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contactById = contacts.find((contact)=> contact.id === contactId)
  return contactById || null
}

const addContact = async (body) => {
  const contacts = await listContacts()
  const newContact = {
    ...body,
    id: nanoid()
  }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
return newContact
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const indexRemove = contacts.findIndex((contact)=> contact.id === contactId)
  if (indexRemove === -1) {
    return null
  }
  const newContacts = contacts.splice(indexRemove, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContacts
}


const updateContact = async (contactId, body) => {
  const contacts = await listContacts()
  const indexUpdate = contacts.findIndex((contact)=> contact.id === contactId)
  if (indexUpdate === -1){
    return null
  }
  contacts[indexUpdate] = {...contacts[indexUpdate], ...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[indexUpdate] 
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
