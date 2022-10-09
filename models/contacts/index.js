const fs = require("fs/promises");

const path = require("path");

const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
};
const getById = async (id) => {
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === String(id));

  return result || null;
};

const addContact = async ({ name, phone, email }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    phone,
    email,
  };
  contacts.push(newContact);
  await updateContacts(contacts);

  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};
const updateContact = async ({ id, name, phone, email }) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, name, phone, email };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
