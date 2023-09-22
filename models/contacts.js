const fs = require('fs/promises')
const { v4: uuidv4 } = require("uuid");

const contactsPath = "models/contacts.json"

const listContacts = async () => {
  const contactList = await fs.readFile(contactsPath);
  return JSON.parse(contactList.toString());
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contact = contacts.find(contact => contact.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  }
  const contactList = JSON.stringify([...contacts, newContact], null, 2)
  await fs.writeFile(contactsPath, contactList)
  return newContact
}

const updateContact = async (contactId, { name, phone, email }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  const [contact] = contacts.filter((el) => el.id === contactId)

  if (!contact) {
    return null
  }
  if (name) {
    contact.name = name
  }
  if (phone) {
    contact.phone = phone
  }
  if (email) {
    contact.email = email
  }

  const [result] = contacts.splice(index, 1, contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return result
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}