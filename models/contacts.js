const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  if (!contacts) {
    return null;
  }
  const result = contacts.find(({ id }) => id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return contacts[idx];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const oldContact = await removeContact(contactId);
  if (!oldContact) {
    return null;
  }

  const contacts = await listContacts();
  const newContact = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify([...contacts, newContact]));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
