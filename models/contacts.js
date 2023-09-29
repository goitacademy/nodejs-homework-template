const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactsPath = "../models/contacts.json";

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    throw new Error("Contact not found");
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  if (!name || !email || !phone) {
    throw new Error("Missing required fields");
  }

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((c) => c.id === contactId);

  if (contactIndex === -1) {
    throw new Error("Contact not found");
  }

  contacts[contactIndex] = {
    ...contacts[contactIndex],
    ...body,
  };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
