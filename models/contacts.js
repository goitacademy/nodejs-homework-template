
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
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

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const { promises: fs } = require("fs"); // Используем fs/promises
const path = require("path");

const pathToContact = path.join(__dirname, "./contacts.json");

// Динамический импорт nanoid
async function getNanoid() {
  const { nanoid } = await import("nanoid");
  return nanoid;
}
const listContacts = async () => {
  const contacts = await fs.readFile(pathToContact);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((i) => i.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const index = listOfContacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = listOfContacts.splice(index, 1);
  await fs.writeFile(pathToContact, JSON.stringify(listOfContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const nanoid = await getNanoid()
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(pathToContact, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(pathToContact, JSON.stringify(contacts, null, 2));

  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};