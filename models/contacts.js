const fs = require("fs/promises");
const path = require("path");
const { 
    v1: uuidv1,
  } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const currentContact = contacts.find((contact) => contact.id === contactId);
  if (!currentContact) {
      return null;
  };
  return currentContact;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
      return null;
  };
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv1(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

const updateContact = async (contactId, body) => {

  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    console.log('There is no contact with such ID');
    return null;
  }

  const updatedContact = { id: contactId, ...body };
  contacts.splice(index, 1, updatedContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
