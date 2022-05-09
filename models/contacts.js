const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const id = contacts.findIndex((item) => item.id === contactId);
  if (id === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== id);
  await updateContacts(newContacts);
  return contacts[id];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), ...body };
  const newContacts = [...contacts, newContact];
  await updateContacts(newContacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const id = contacts.findIndex((item) => item.id === contactId);
  if (id === -1) {
    return null;
  }
  contacts[id] = { ...contacts[id], ...body };
  await updateContacts(contacts);
  return contacts[id];
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
