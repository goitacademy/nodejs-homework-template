const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  
  const contacts = await listContacts();
  const idContact = contacts.find((person) => person.id === contactId);
  return idContact || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((person) => person.id === id);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact || null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const id = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((person) => person.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = {id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
