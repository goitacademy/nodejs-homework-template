const fs = require("fs/promises");
const contactsPath = require("../contactsPath");
const { v4 } = require("uuid");

const { withTryCatch } = require("../helpers/");

const listContacts = withTryCatch(async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  const allContacts = JSON.parse(data);
  if (allContacts.length !== 0) {
    return allContacts;
  }
  return null;
});

const getContactById = withTryCatch(async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
});

const addContact = withTryCatch(async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContacts = { id: v4(), name, email, phone };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return newContacts;
});

const updateContact = withTryCatch(async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
});

const removeContact = withTryCatch(async (id) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 4));
  return removeContact;
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
