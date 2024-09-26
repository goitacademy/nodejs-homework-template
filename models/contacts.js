const path = require("path");
const { readFile, writeFile } = require("fs/promises");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const readContacts = async () => {
  const contactsJson = await readFile(contactsPath, "utf-8");
  return JSON.parse(contactsJson);
};

const readContactById = async (contactId) => {
  const allContacts = await readContacts();
  const result = allContacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await readContacts();
  const removedContact = await readContactById(contactId);
  const newContacts = allContacts.filter((contact) => contact.id !== contactId);
  await writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return removedContact || null;
};

const createNewContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await readContacts();
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

const writeUpdatedContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const allContacts = await readContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  if (name) {
    allContacts[index].name = name;
  }
  if (email) {
    allContacts[index].email = email;
  }
  if (phone) {
    allContacts[index].phone = phone;
  }
  await writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

module.exports = {
  readContacts,
  readContactById,
  removeContact,
  createNewContact,
  writeUpdatedContact,
};