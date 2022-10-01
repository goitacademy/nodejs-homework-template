const fs = require("fs").promises;
const path = require("path");
const createError = require("../utils/createError");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((contact) => contact.id === contactId);
  if (!contactById) {
    throw createError(404, "Not found");
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactForRemove = contacts.find((contact) => contact.id === contactId);
  if (!contactForRemove) {
    throw createError(404, "Not found");
  }
  const contactsAfterRemove = contacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(contactsAfterRemove, null, 2));
  return contactForRemove;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    ...body,
  };
  contacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id !== contactId);

  if (index === -1) {
    throw createError(404, "Not found");
  }

  contacts[index].name = name;
  contacts[index].email = email;
  contacts[index].phone = phone;

  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
