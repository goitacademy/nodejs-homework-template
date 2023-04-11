const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact ?? null;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const id = nanoid(21);
  const newcontact = { id, ...body };
  contacts.push(newcontact);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return newcontact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const removedContact = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return removedContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf8");
  return contacts[index];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
