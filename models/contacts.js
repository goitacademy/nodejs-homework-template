const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContact = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...data };

  await updateContact(contacts);

  return contacts[index];
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter(({ id }) => id !== contactId);

  await updateContact(newContacts);
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const id = nanoid();
  const newContact = { id, name, email, phone };

  contacts.push(newContact);
  await updateContact(contacts);

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactById,
};