const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const buffer = await fs.readFile(contactsPath);
  return JSON.parse(buffer);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find(({ id }) => id === contactId);
  return result;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const currentIndex = data.findIndex(({ id }) => id === contactId);
  if (currentIndex === -1) return null;

  const [result] = data.splice(currentIndex, 1);
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
  const currentIndex = data.findIndex(({ id }) => id === contactId);
  if (currentIndex === -1) return null;

  data[currentIndex] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[currentIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
