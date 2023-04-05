const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === id);
  if (contactIndex === -1) {
    return null;
  }
  return data[contactIndex];
};

const removeContact = async (id) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const [result] = data.splice(contactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  return result;
};

const addContact = async (body) => {
  const newContact = { ...body, id: nanoid() };
  const data = await listContacts();
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  return newContact;
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === id);
  if (contactIndex === -1) {
    return null;
  }
  const newContact = { ...data[contactIndex], ...body };
  data.splice(contactIndex, 1, newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 1));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
