const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (id) => {
  const contactsId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactsId);

  return result || null;
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

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const result = contacts.findIndex((item) => item.id === id);
  if (result === -1) {
    return null;
  }

  contacts[result] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[result];
};

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
