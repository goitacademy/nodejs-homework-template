const fs = require('fs/promises')
const {nanoid} = require('nanoid');
const path = require('path');
const contactsPath = path.resolve("models", "contacts.json");


const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const chosenContact = contacts.find(item => item.id === contactId);
  return chosenContact || null;
}


const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  console.log(name);
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removed] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removed;
}
const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = {
    id: contactId,
    name,
    email,
    phone
  };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
