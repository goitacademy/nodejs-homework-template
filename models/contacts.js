const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const rewriteContacts = async (contacts) => {
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const oneContact = data.find((item) => item.id === contactId);
  return oneContact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await rewriteContacts(data);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await rewriteContacts(data);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index] = { id, name, email, phone };
  await rewriteContacts(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
