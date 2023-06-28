const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
// const {CtrlWrapper} = require("../helpers")

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

const getContactById = async (contactId) => {
  const idContact = String(contactId);
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === idContact);

  return contactById || null;
};

const removeContact = async (contactId) => {
  const idContact = String(contactId);
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === idContact);
  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
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
  const books = await listContacts();
  const index = books.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  books[index] = { contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(books, null, 2));
  return books[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
