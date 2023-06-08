const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const result = allContacts.find((el) => el.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const index = allContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const result = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const data = await fs.readFile(contactsPath);
  const allContacts = JSON.parse(data);
  const index = allContacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
