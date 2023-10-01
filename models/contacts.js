import { nanoid } from 'nanoid'
const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(process.cwd(), "./contacts.json");

const listContacts = async() => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(contact => contact.id === contactId) || null;
}

const addContact = async (body) => {
  
  const { name, email, phone } = body;
  
  const newCont = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  
  const contacts = await listContacts();
  contacts.push(newCont);
  
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newCont;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const indexToRemove = contacts.findIndex(contact => contact.id === contactId);
  if (indexToRemove === -1) {
      return null;
  }

  const removedContact = contacts.splice(indexToRemove, 1)[0];
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexToUpdate = contacts.findIndex(contact => contact.id === contactId);
  
  if (indexToUpdate === -1) {
    return null;
  }

  const updatedContact = {
    ...contacts[indexToUpdate],
    ...body,
  };

  contacts[indexToUpdate] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
