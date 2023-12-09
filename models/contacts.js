const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");


const contactsPath = path.join(__dirname, '../models/contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(({ id }) => id === contactId.toString());
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => {
    return id === contactId.toString();
  });

  if (index === -1) {
    return null;
  }
  const [removedContacts] = contacts.splice(index, 1);
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data, "utf-8");
  return removedContacts;
};

const addContact = async ({ name, email, phone }) => {
  if (!name || !email || !phone) {
    return `Fill in the required parameters: name, email, phone`;
  }

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();
  const index = contacts.findIndex((item) => {
    return item.id === contactId.toString();
  });

  if (index === -1) {
    return null;
  }

  const contact = { ...contacts[index], name, email, phone };
  contacts[index] = contact;
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data, "utf-8");
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};

