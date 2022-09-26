const fs = require("fs/promises");
const path = require("path");

const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (data) => {
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const id = String(contactId);
  const result = data.find((item) => item.id === id);
  return result || null;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  await updateContacts(data);
  return newContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const id = String(contactId);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = data.splice(index, 1);
  await updateContacts(data);
  return result;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  data[index] = { contactId, name, email, phone };
  await updateContacts(data);
  return data[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
