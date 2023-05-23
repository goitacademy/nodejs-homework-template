// const fs = require('fs/promises')
const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const id = String(contactId);
  const data = await listContacts();
  const contact = data.find((item) => item.id === id);
  return contact || null;
};

const removeContact = async (contactId) => {
  const id = String(contactId);
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);

  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: nanoid(), name: name, email: email, phone: phone };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contactId = String(id);
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }
  data[index] = { id: id, name: name, email: email, phone: phone };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
