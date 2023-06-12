const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '/contacts.json');
const { nanoid } = require('nanoid');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const data = await listContacts();
  const contact = data.find((item) => item.id === id);
  return contact || null;
};

const removeContact = async (id) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (body) => {
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  data.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = {
    id,
    ...body,
  };
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
