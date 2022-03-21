const fs = require("fs/promises");
const contactsPath = require("./contactsPath");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  const parseContacts = await JSON.parse(contacts);
  return parseContacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = await contacts.find((item) => item.id === contactId);
  if (!contactById) {
    return null;
  }
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = await contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = await contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const id = uuidv4();
  const newContact = { id, name, email, phone };
  await contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = await contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = await { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
