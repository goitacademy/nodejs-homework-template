const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./models/contacts.json");
const nextIdPath = path.resolve("./models/nextId.txt");
const ENCODING = "utf8";

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath, ENCODING));
};

const getContactById = async (contactId) => {
  return (await listContacts()).find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  if (contacts.findIndex((contact) => contact.id === contactId) === -1) {
    return 404;
  }
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts.filter((contact) => contact.id !== contactId)),
    ENCODING
  );
  return 200;
};

const addContact = async (body) => {
  const nextId = await fs.readFile(nextIdPath, ENCODING);
  const contacts = await listContacts();
  const newContact = { id: nextId, ...body };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts), ENCODING);
  await fs.writeFile(nextIdPath, (+nextId + 1).toString(), ENCODING);
  return newContact;
};

// Я так зрозумів з тз, що воно має оновлювати контакт а не замінювати його на новий
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let patched = null;
  contacts.forEach((contact, index) => {
    if (contact.id === contactId) {
      contacts.splice(index, 1, { ...contact, ...body });
      patched = contacts[index];
    }
  });
  if (!patched) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts), ENCODING);
  return patched;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
