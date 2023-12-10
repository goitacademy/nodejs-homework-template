const fs = require('fs/promises');
const { randomUUID } = require('crypto');
const path = require('path');
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const idContact = await contacts.find(contact => contact.id === contactId);
  return idContact || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const filterContacts = await contacts.findIndex(user => user.id === contactId);
  if (filterContacts === -1) {
    return null
  };
  const [result] = contacts.splice(filterContacts, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;

}

const addContact = async (body) => {
  const contacts = await listContacts();
  const contact = { id: randomUUID(), ...body };
  contacts.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const updateContact = async (contactId, body) => { 
  const contacts = await listContacts();
  const contactUpdate = await contacts.findIndex(contact=>contact.id===contactId);
  if (contactUpdate===-1) {
    return null
  }
  contacts[contactUpdate]={contactId,...body}
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[contactUpdate]

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
