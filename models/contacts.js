const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const response = await fs.readFile(contactsPath);
  return JSON.parse(response);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === id);
  if (!findContact) {
    return null;
  }
  return findContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const findByIndex = contacts.findIndex((contact) => contact.id === id);
  if (findByIndex === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(findByIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const findByIndex = contacts.findIndex((contact) => contact.id === id);
  if (findByIndex === -1) {
    return null;
  }
  contacts[findByIndex] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[findByIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
