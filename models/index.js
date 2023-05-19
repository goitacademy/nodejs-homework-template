const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  return result || null;
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
  data[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[index];
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

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
