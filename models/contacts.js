const fs = require('fs/promises');
const {v4} = require('uuid');
const {contactsPath} = require('../helpers')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = await JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  if(!result) {
    return null;
  }
  return result;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {id: v4(), ...body};
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  
  if(index === -1) {
    return null;
  }
   contacts[index] = { id, ...body};
  
   await fs.writeFile(contactsPath, JSON.stringify(contacts))
   return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
