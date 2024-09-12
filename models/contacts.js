const fs = require('fs').promises;
const path = require('node:path');
const { nanoid } = require('nanoid');
const contactsPath = path.join('./models/', "contacts.json");

const listContacts = async () => {
    const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

const getContactById = async (id) => {
  const data = await listContacts();
  const result = data.find(item => item.id === id);
  return result || null;
}

const addContact = async (data) => {
const contacts = await listContacts();
  const newContact = {id: nanoid(), ...data,}   
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const removeContact = async (id) => {
    const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
    const [result] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}
  
const updateContact = async (id, data) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data, };   
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return  contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
