const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const getAllContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getAllContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await getAllContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await getAllContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  getAllContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};