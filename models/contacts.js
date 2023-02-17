const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("models/contacts.json");

async function updateContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId.toString());
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  const [removeContact] = data.splice(index, 1);
  await updateContacts(data);
  return removeContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newItem = {
    id: nanoid(3),
    name,
    email,
    phone,
  };
  const data = await listContacts();
  data.push(newItem);
  await updateContacts(data);
  return newItem;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId.toString());
  if (index === -1) {
    return null;
  }
  data[index] = { ...data[index], ...body, id: contactId.toString() };
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
