const { json } = require('express');
const fs = require('fs/promises')
const path = require("path")
const contactsPath = path.join (__dirname, 'contacts.json');

const { v4: uuidv4 } = require('uuid');


const updateContact = async (contacts) => { 
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  if (!result) {
    return null;
  }
  return result;
}

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);

  if (!index) {
    return null;
  }

  const [removeContact] = contacts.splice(index, 1);
  await updateContact(contacts);
  return removeContact;
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone
  }
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
}

const updateContactById = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);

  if (index === -1) {
      return null;
  }

  contacts[index] = {
      id,
      name,
      email,
      phone
  };

  await updateContact(contacts);
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
