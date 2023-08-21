const fs = require('fs/promises');
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(contact => contact.id === id);
  return result || null;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if(index === -1){
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

const addContact = async (body) => {
  console.log('addContact');
  const contacts = await listContacts();
  const newContact = {
      id: crypto.randomUUID(),
      ...body,
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, body) => {
  console.log('updateContact');
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === id);
  if(index === -1){
      return null;
  }
  contacts[index] = {id, ...body};
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
