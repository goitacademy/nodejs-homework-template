const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId.toString());
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
    id: v4(),
    name,
    email,
    phone,
  };
  const newContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  if (!body) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
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
