const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contactsJson = await readFile(contactsPath, "utf-8");
  return JSON.parse(contactsJson);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const removedContact = await getContactById(contactId);
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return removedContact || null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    allContacts[index].name = name;
    allContacts[index].email = email;
    allContacts[index].phone = phone;
    return allContacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
