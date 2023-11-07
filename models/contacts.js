const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
};

const removeContact = async (contactId) => {
  let contacts = await listContacts();
  const delContact = contacts.find((contact) => contact.id === contactId);
  if (!delContact) {
    return null;
  }
  contacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return delContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  let contacts = await listContacts();
  if (!contacts.find((contact) => contact.id === contactId)) {
    return null;
  }
  contacts = contacts.filter((contact) => contact.id !== contactId);
  contacts.push({ id: contactId, ...body });

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { id: contactId, ...body };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
