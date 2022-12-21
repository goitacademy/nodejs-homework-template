const fs = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");

  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();

  const contact = contacts.find(({ id }) => id === contactId);

  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  const deletedContact = contacts.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const contact = {
    id: uuid(),
    name,
    email,
    phone,
  };

  contacts.push(contact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id: contactId, ...body };

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
