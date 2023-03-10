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
  const contact = data.find((item) => item.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = data.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return result;
};

const addContact = async (body) => {
  const data = await listContacts();
  const contact = {
    id: nanoid(),
    ...body,
  };
  data.push(contact);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return contact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const idx = data.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  data[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
