const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  const readList = await fs.readFile(contactsPath);
  const data = JSON.parse(readList);
  return data;
};

const getById = async (contactId) => {
  const list = await listContacts();
  const result = list.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = list.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return result;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const list = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  list.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const list = await listContacts();
  const index = list.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  list[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
