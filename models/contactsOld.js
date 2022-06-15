const fs = require("fs/promises");
const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const searchedContact = data.find(({ id }) => id === contactId.toString());
  if (!searchedContact) return null;
  return searchedContact;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const deletedContactIndex = data.findIndex(
    ({ id }) => id === contactId.toString()
  );
  if (deletedContactIndex === -1) return null;
  const deletedContact = data.splice(deletedContactIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  const newData = [...data, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await listContacts();
  const updatedContactIndex = data.findIndex(
    ({ id }) => id === contactId.toString()
  );
  if (updatedContactIndex === -1) return null;
  data[updatedContactIndex] = { ...data[updatedContactIndex], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
  return data[updatedContactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
