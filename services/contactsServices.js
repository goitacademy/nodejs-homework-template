const fs = require('fs/promises')
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.resolve(__dirname, "../db/contacts.json");

const listContacts = async () => {
  const listContactsData = await fs.readFile(contactsPath);
  return JSON.parse(listContactsData);  
}

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contactById = contactsList.find(contact => contact.id === contactId);
  return contactById || null
}

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null
  }
  const [result] = contactsList.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
  return result
}

const addContact = async (body) => {
  const contactsList = await listContacts();
  const newContact = { id: nanoid(), ...body }
  contactsList.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
  return newContact  
}

  const updateContactById = async (contactId, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null
    } 
  contactsList[index] = { ...contactsList[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2))
  return contactsList[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById
}

 