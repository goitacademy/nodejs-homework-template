const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(filePath, JSON.stringify(newContacts));
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };

  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...contacts[idx], ...body };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
