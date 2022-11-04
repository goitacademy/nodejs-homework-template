const fs = require('fs/promises')
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json")

const listContacts = async () => {
  const readedContacts = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(readedContacts);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null
  }
  return contact;
}

const removeContact = async (contactId) => { const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) {
    return null
  }
  const deletedContact = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(deletedContact))
  return deletedContact;}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
     
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts;

}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  
  const contactIndex = contacts.findIndex(contact => contact.id === contactId)
  if (contactIndex === -1) {
    return null
  }
  contacts[contactIndex] = { ...contacts[contactIndex], ...body };
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[contactIndex];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}