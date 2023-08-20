const fs = require('fs/promises');
const path = require('path');
const crypto = require("node:crypto");
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(allContacts)
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const oneContact = allContacts.find(({ id }) => id === contactId)
  return oneContact || null
}

const removeContact = async (contactId) => {
  console.log(contactId)
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }

 const [deletedContact]= allContacts.splice(idx, 1)
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
  
}

const addContact = async (data) => {

  const allContacts = await listContacts();
  const newContact = {
    ...data,
    id: crypto.randomUUID(), 
  }
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const idx = allContacts.findIndex(({ id }) => id === contactId);
 
  const newData = {
    ...body,
    id: contactId
  };

  allContacts[idx] = newData;
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return newData;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
