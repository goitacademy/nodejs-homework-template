const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const existingContact = contacts.find((item) => item.id === contactId);

  if (!existingContact) {
    return null;
  }

  const result = contacts.filter((item) => item.id !== contactId);

  await updateContacts(result);

  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;

  const contacts = await listContacts();

  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = {
    id: contactId,
    name: name || contacts[contactIndex].name,
    email: email || contacts[contactIndex].email,
    phone: phone || contacts[contactIndex].phone,
  };

  contacts[contactIndex] = updatedContact;

  await updateContacts(contacts);

  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
