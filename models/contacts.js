const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((i) => i.id === id);
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((i) => i.id === id);
  if (contactIndex === -1) {
    return null;
  }
  contacts.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return true;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };

  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return newContacts;
};

const updateContact = async (id, data) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((i) => i.id === id);
  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { id, ...data };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 1));
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
