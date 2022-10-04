const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const date = await fs.readFile(contactsPath);
  return JSON.parse(date);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    "../models/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
  return contacts[index];
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idContact = String(contactId);
  const index = contacts.findIndex((contact) => contact.id === idContact);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(
    "./models/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
