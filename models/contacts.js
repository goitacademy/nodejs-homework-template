const fs = require("fs/promises");
const path = require("path");
const nanoid = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const readContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  return await readContacts();
};

const getContactById = async (contactId) => {
  const contacts = await readContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const [removedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  contacts[index] = { ...contacts[index], name, email, phone };
  await writeContacts(contacts);
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
