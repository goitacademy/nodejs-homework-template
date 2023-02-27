const fs = require('fs/promises');
const path = require("path");
const { uid } = require("uid");

const contactsPath = path.resolve(__dirname, "contacts.json")

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  if (!contact) {
    return null
  }
  return contact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts(); 
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uid(2),
    ...body
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return contacts[index]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
