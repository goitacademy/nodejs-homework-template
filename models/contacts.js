const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const { createError } = require("../helpers");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);

  if (!contact) {
    throw createError(404, "Contact not found");
  }

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    throw createError(404, "Book not found");
  }

  const [result] = contacts.splice(index, 1);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    throw createError(404, "Book not found");
  }

  contacts[index].name = name;
  contacts[index].email = email;
  contacts[index].phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
