const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "contacts.json");

async function readContacts() {
  const dbRaw = await fs.readFile(contactsPath, "utf8");
  const db = JSON.parse(dbRaw);
  return db;
}

async function writeContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

const listContacts = async (limit = 0) => {
  const contacts = await readContacts();
  return contacts.slice(-limit);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const currentContacts = contacts.find((contact) => contact.id === contactId);
  return currentContacts || null;
};

const addContact = async (name, email, phone) => {
  const id = nanoid();
  const contact = { id, name, email, phone };

  const contacts = await listContacts();
  contacts.push(contact);
  await writeContacts(contacts);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deleteContacts = contacts.filter((todo) => todo.id !== contactId);
  await writeContacts(deleteContacts);
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const id = contactId;
  const newContact = { id, name, email, phone };
  const contacts = await listContacts();
  const updateContact = contacts.find((contact) => contact.id === contactId);
  updateContact.name = newContact.name;
  updateContact.email = newContact.email;
  updateContact.phone = newContact.phone;
  await writeContacts(contacts);

  return updateContact;
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
