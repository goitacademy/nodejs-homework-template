const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async function () {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const contactById = data.find((item) => item.id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const contactList = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return data;
};

const addContact = async (name, email, phone) => {
  const data = await listContacts();
  const contactNew = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(contactNew);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contactNew;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const contactIndex = data.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  data[contactIndex] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
