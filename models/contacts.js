const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

const readContacts = async () => {
  const contactsRaw = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(contactsRaw);
  return contacts;
};

const writeContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await readContacts();
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await readContacts();
  const contactById = contacts.find((contact) => contact.id == id);
  return contactById;
};

const removeContact = async (id) => {
  const contacts = await readContacts();
  const removeContacts = contacts.filter((contact) => contact.id !== id);
  await writeContacts(removeContacts);
};

const addContact = async (body) => {
  const id = nanoid();
  // const { name, email, phone } = body;
  const newContact = { id, body };
  const contacts = await readContacts();
  contacts.push(newContact);
};

const updateContact = async (id, body) => {
  const contacts = await readContacts();
  const updateContacts = contacts.find((contact) => contact.id === id);
  await writeContacts(updateContacts, body);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
