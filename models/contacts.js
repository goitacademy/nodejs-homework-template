const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./contacts.json");
const { nanoid } = require("nanoid");

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async (id) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((e) => e.id === id);
  return contact || null;
};

const removeContact = async (id) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((e) => e.id === id);
  if (index === -1) return null;
  const result = allContacts.splice(index, 1);
  updateContacts(allContacts);
  return result;
};

const addContact = async (data) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  const newArr = [...allContacts, newContact];
  updateContacts(newArr);
  return newContact;
};

const updateContactById = async (id, body) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((e) => e.id === id);
  if (index === -1) return null;
  let contact = allContacts[index];
  contact = { ...contact, ...body };
  const result = (allContacts[index] = contact);
  updateContacts(allContacts);
  return result;
};

const updateContacts = async (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContacts,
  updateContactById,
};